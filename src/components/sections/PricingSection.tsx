// src/components/sections/PricingSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown, X } from "lucide-react";
import React, { useState } from 'react';
import Image from 'next/image';

interface Plan {
    name: string;
    oldPrice: string;
    newPrice: string;
    cta: string;
    popular: boolean;
}

type FeatureValue = string | boolean;

interface FeatureRow {
    name: string;
    isHeader?: false;
    values: FeatureValue[];
}

interface FeatureHeader {
    name: string;
    isHeader: true;
    values: [];
}

type PricingFeature = FeatureRow | FeatureHeader;

interface PricingData {
    plans: Plan[];
    features: PricingFeature[];
}

const pricingData: PricingData = {
    plans: [
        { name: "Starter", oldPrice: "299", newPrice: "149", cta: "Solicita 14 Días Gratis", popular: false },
        { name: "Basic", oldPrice: "649", newPrice: "399", cta: "Solicita 'Early Access'", popular: false },
        { name: "Growth", oldPrice: "1,499", newPrice: "999", cta: "Solicita 'Early Access'", popular: true },
        { name: "Scale", oldPrice: "3,499+", newPrice: "2,499+", cta: "Conversemos", popular: false }
    ],
    features: [
        { name: "Prueba Gratuita", values: ["Acceso 14 Días Gratis", "No", "No", "No"] },
        { name: "Conexiones", values: ["3", "5", "5", "Ilimitadas"] },
        { name: "", values: ["(CMS, ERP, Google Ads, GA4)", "(+ Meta Ads y 1 conexión extra)", "(+ Meta Ads y 1 conexión extra)", "(+ TikTok y Spotify)"] },
        { name: "Asistencia en Conexiones", values: ["Tutorial paso a paso + Asistencia personalizada", "Conectamos tus herramientas de negocios y marketing", "Conectamos tus herramientas de negocios y marketing", "Conectamos tus herramientas de negocios y marketing"] },
        { name: "Negocio", isHeader: true, values: [] },
        { name: "Dashboard de Negocio", values: [true, true, true, true] },
        { name: "Análisis y Categorización de Clientes (RFM)", values: [true, true, true, true] },
        { name: "Análisis de Inventario", values: [true, true, true, true] },
        { name: "Alertas y Oportunidades", values: [true, true, true, true] },
        { name: "Marketing", isHeader: true, values: [] },
        { name: "Plan de Marketing", values: [
            "Plan de Marketing 100% IA con 3 meses de tácticas.",
            "Plan de Marketing 100% IA con 3 meses de tácticas",
            "Plan de Marketing con 12 meses de tácticas, hecho con IA, validado por Marketing Manager.",
            "Plan de Marketing con 12 meses de tácticas, hecho con IA, validado por Marketing Manager."
        ] },
        { name: "Creación y Ejecución de Campañas IA", values: [false, true, true, true] },
        { name: "Optimización de Campañas 24/7", values: [false, true, true, true] },
        { name: "Módulo de Aprobación de Campañas", values: [false, true, true, true] },
        { name: "Dashboard de Rendimiento de Campañas", values: [true, true, true, true] },
        { name: "Asesoría y Supervisión", isHeader: true, values: [] },
        { name: "Marketing Manager Asignado a la Cuenta", values: [false, false, "Asesoría Estándar", "Asesoría Prioritaria"] },
        { name: "Chat IA \"Conversa con tus Datos\"", values: [false, true, true, true] },
        { name: "Onboarding Tour 1:1", values: [false, true, true, true] },
    ]
};

const PricingSection = () => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        "Negocio": true,
        "Marketing": false,
        "Asesoría y Supervisión": false,
    });

    const toggleSection = (sectionName: string) => {
        setExpandedSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
    };

    // Group features into collapsible sections
    const featureGroups: Array<{ header?: FeatureHeader; items: FeatureRow[] }> = [];
    let currentGroup: { header?: FeatureHeader; items: FeatureRow[] } = { items: [] };

    pricingData.features.forEach(feature => {
        if (feature.isHeader) {
            // If the current group has items (from before the first header), push it.
            if (currentGroup.items.length > 0) {
                featureGroups.push(currentGroup);
            }
            // Start a new group with the new header.
            currentGroup = { header: feature as FeatureHeader, items: [] };
        } else {
            // Add the feature row to the current group.
            currentGroup.items.push(feature as FeatureRow);
        }
    });
    featureGroups.push(currentGroup); // Push the last group after the loop.

    return (
        <section id="precios" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="font-semibold text-[#00bcd4] mb-2">
                        Sin contratos anuales y sin comisiones
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Planes que Crecen con tu Negocio
                    </h2>
                    <p className="text-gray-500 mt-4">
                        Garantía on-demand. Suscríbete ahora, termina cuando quieras.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto relative mt-16">
                    <div className="absolute top-[110px] left-[20px] z-10 pointer-events-none">
                        <Image
                            src="/lanzamiento-tag.png"
                            alt="Precios de Lanzamiento"
                            width={180}
                            height={180}
                            className="transform -rotate-[15deg]"
                        />
                    </div>
                    
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="w-1/4 p-4 align-bottom"></th>
                                {pricingData.plans.map((plan, index) => (
                                    <th key={index} className="w-1/4 p-4 align-bottom">
                                        <div className={`text-center rounded-xl p-6 ${plan.popular ? 'bg-purple-50 border-2 border-purple-500' : ''}`}>
                                            <h3 className="text-xl font-bold">{plan.name}</h3>
                                            <div className="my-2">
                                                <span className="text-gray-400 line-through">${plan.oldPrice}</span>
                                                <div className="flex items-baseline justify-center gap-1">
                                                    <span className="text-5xl font-bold tracking-tighter">${plan.newPrice}</span>
                                                    <span className="text-gray-500 text-sm">USD/mes</span>
                                                </div>
                                            </div>
                                            <Button className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50'}`}>
                                                {plan.cta}
                                            </Button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {featureGroups.map((group, groupIndex) => (
                                <React.Fragment key={group.header?.name || groupIndex}>
                                    {group.header && (
                                        <tr>
                                            <td colSpan={5} className="pt-8 pb-2">
                                                <button
                                                    onClick={() => toggleSection(group.header!.name)}
                                                    className="w-full flex justify-between items-center text-left px-4"
                                                >
                                                    <h4 className="text-base font-bold text-gray-800">{group.header.name}</h4>
                                                    <ChevronDown className={`w-8 h-8 text-[#e91e63] transition-transform duration-200 ${expandedSections[group.header.name] ? 'rotate-180' : ''}`} />
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    {(!group.header || expandedSections[group.header.name]) && group.items.map((feature, featureIndex) => {
                                        // --- CORRECCIÓN AQUÍ ---
                                        // La variable 'isLastRow' que no se usaba ha sido eliminada.
                                        const isSubFeature = feature.name === "";
                                        return (
                                            <tr key={feature.name || `sub-feature-${featureIndex}`}>
                                                <td className={`p-4 font-normal text-gray-700 ${isSubFeature ? 'border-t-0 pt-0' : 'border-t border-gray-200'}`}>{feature.name}</td>
                                                {feature.values.map((value, planIndex) => {
                                                    const isPopular = pricingData.plans[planIndex]?.popular;
                                                    return (
                                                        <td key={planIndex} className={`p-4 text-center ${isSubFeature ? 'border-t-0 pt-0' : 'border-t border-gray-200'}`}>
                                                            {typeof value === 'boolean' ? (
                                                                value ? <Check className="w-6 h-6 text-purple-600 mx-auto" /> : <X className="w-6 h-6 text-gray-400 mx-auto" />
                                                            ) : (
                                                                <span className={`${
                                                                    (value === "Acceso 14 Días Gratis" || value === "Asesoría Prioritaria")
                                                                        ? 'text-sm font-bold text-[#e91e63]'
                                                                        : (feature.name === 'Plan de Marketing' && isPopular) 
                                                                            ? 'text-xs font-bold text-purple-600'
                                                                            : 'text-xs text-gray-600'
                                                                }`}>
                                                                    {value}
                                                                </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;