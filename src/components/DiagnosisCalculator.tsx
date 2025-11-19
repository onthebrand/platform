"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Info, Loader2 } from 'lucide-react';
import { submitDiagnosisForm } from '@/app/agencia/actions';

const complexityPoints = {
    assets: { instagram: 2, facebook: 2, linkedin: 2, tiktok: 2, googleAds: 8, metaAds: 6, linkedinAds: 4, tiktokAds: 5, googleAnalytics: 8, googleTagManager: 9, googleSearchConsole: 3, googleBusinessProfile: 1, googleMerchantCenter: 5, emailMarketing: 6, heatmaps: 5, firebase: 10, CRM: 8, ERP: 10, otherPlatforms: 5 },
    database: { no: 0, menos_100: 0, entre_100_500: 2, entre_500_1000: 4, mas_1000: 6 },
    businessModel: { b2c: 3, b2b: 3, b2b_b2c: 5, b2b2c: 5 },
    companySize: {
        micro: 1,
        pequena: 1.1,
        mediana: 1.4,
        grande: 1.8,
    },
    ecommerce: {
        no: 0,
        si: 6,
    },
    competitors: {
        3: 4,
        4: 6,
        5: 8,
    }
};

const tooltips = {
    instagram: "Gestión de perfil y contenido orgánico en Instagram.",
    facebook: "Gestión de página y contenido orgánico en Facebook.",
    linkedin: "Perfil de empresa y estrategia de contenido profesional.",
    tiktok: "Creación y gestión de contenido de video corto.",
    googleAds: "Campañas de búsqueda, display, YouTube, etc.",
    metaAds: "Campañas pagadas en Facebook e Instagram.",
    linkedinAds: "Publicidad dirigida a audiencias profesionales.",
    tiktokAds: "Campañas de video para audiencias jóvenes.",
    googleAnalytics: "Análisis de tráfico y comportamiento del sitio web.",
    googleTagManager: "Gestión centralizada de etiquetas y scripts de seguimiento.",
    googleSearchConsole: "Monitoreo del rendimiento orgánico en la búsqueda de Google.",
    googleBusinessProfile: "Gestión de tu perfil de negocio en Google Maps y Búsqueda.",
    googleMerchantCenter: "Sincronización de productos para Google Shopping.",
    emailMarketing: "Plataformas como Mailchimp, ActiveCampaign, etc.",
    heatmaps: "Herramientas como Hotjar o Clarity para análisis de comportamiento.",
    firebase: "Plataforma de Google para el desarrollo de apps móviles y web.",
    CRM: "Software de gestión de relaciones con clientes (ej. Hubspot, Salesforce).",
    ERP: "Sistemas de planificación de recursos empresariales (ej. SAP, Oracle, Odoo).",
    otherPlatforms: "Cualquier otra plataforma relevante no listada.",
    b2b: "Business-to-Business: Empresas que venden a otras empresas.",
    b2c: "Business-to-Consumer: Empresas que venden directamente al consumidor final.",
    b2b_b2c: "Modelo híbrido que atiende tanto a empresas como a consumidores.",
    b2b2c: "Business-to-Business-to-Consumer: Empresas que venden a través de un intermediario al consumidor final.",
};

const steps = [
    { id: 'name', label: 'Tu nombre' },
    { id: 'email', label: 'Email de contacto' },
    { id: 'company', label: 'Tu empresa' },
    { id: 'company_size', label: 'Tamaño de empresa' },
    { id: 'industry', label: 'Industria' },
    { id: 'competitors', label: 'Competidores' },
    { id: 'assets', label: 'Plataformas actuales' },
    { id: 'database', label: 'Base de datos' },
    { id: 'database_size', label: 'Tamaño de la base de datos' },
    { id: 'website', label: 'Sitio web' },
    { id: 'ecommerce', label: 'eCommerce' },
    { id: 'businessModel', label: 'Modelo de negocio' },
];

export default function DiagnosisCalculator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        industry: '',
        otherIndustry: '',
        company_size: '',
        assets: [] as string[],
        database: 'no',
        database_size: '',
        website: '',
        ecommerce: 'no',
        competitors: ['', '', '', '', ''],
        businessModel: '',
        email: ''
    });
    const [showResult, setShowResult] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (formData.database === 'no' && currentStep === 7) {
            setCurrentStep(currentStep + 2); // Saltar tamaño de base de datos
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (formData.database === 'no' && currentStep === 9) {
            setCurrentStep(currentStep - 2); // Volver saltando tamaño
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCompetitorChange = (index: number, value: string) => {
        const newCompetitors = [...formData.competitors];
        newCompetitors[index] = value;
        setFormData(prev => ({ ...prev, competitors: newCompetitors }));
    };

    const handleCheckboxChange = (asset: string) => {
        setFormData(prev => {
            const newAssets = prev.assets.includes(asset)
                ? prev.assets.filter(a => a !== asset)
                : [...prev.assets, asset];
            return { ...prev, assets: newAssets };
        });
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotal = useMemo(() => {
        let totalPoints = 0;
        formData.assets.forEach(asset => {
            totalPoints += complexityPoints.assets[asset as keyof typeof complexityPoints.assets] || 0;
        });
        if (formData.database === 'si') {
            totalPoints += complexityPoints.database[formData.database_size as keyof typeof complexityPoints.database] || 0;
        }
        totalPoints += complexityPoints.businessModel[formData.businessModel as keyof typeof complexityPoints.businessModel] || 0;
        totalPoints += complexityPoints.ecommerce[formData.ecommerce as keyof typeof complexityPoints.ecommerce] || 0;

        const competitorCount = formData.competitors.filter(c => c.trim() !== '').length;
        if (competitorCount >= 3) {
            totalPoints += complexityPoints.competitors[competitorCount as keyof typeof complexityPoints.competitors] || complexityPoints.competitors[5];
        }
        
        const sizeMultiplier = complexityPoints.companySize[formData.company_size as keyof typeof complexityPoints.companySize] || 1;
        const finalPrice = (100000 + (totalPoints * 7700)) * sizeMultiplier;
        return finalPrice;
    }, [formData]);

    const totalSteps = formData.database === 'no' ? steps.length - 2 : steps.length - 1;
    const currentProgressStep = useMemo(() => {
        if (formData.database === 'no' && currentStep > 4) {
            return currentStep - 1;
        }
        return currentStep;
    }, [currentStep, formData.database]);

    const progress = (currentProgressStep / totalSteps) * 100;

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (isNextDisabled()) return;

        setIsSubmitting(true);
        const result = await submitDiagnosisForm({ ...formData, calculatedPrice: calculateTotal });

        setIsSubmitting(false);
        if (result.success) {
            setShowResult(true);
        } else {
            alert(result.error || 'Hubo un error al enviar la cotización. Por favor, inténtalo de nuevo.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') {
            e.preventDefault();
            if (!isNextDisabled()) {
                handleNext();
            }
        }
    };

    const renderStep = () => {
        const step = steps[currentStep];
        switch (step.id) {
            case 'name':
                return <Input name="name" placeholder="Ej: Juan Pérez" value={formData.name} onChange={handleInputChange} className="text-lg p-6" />;
            case 'company':
                return <Input name="company" placeholder="Ej: Mi Empresa SpA" value={formData.company} onChange={handleInputChange} className="text-lg p-6" />;
            case 'industry':
                return <Input name="industry" placeholder="Ej: Retail, Salud, Finanzas..." value={formData.industry} onChange={handleInputChange} className="text-lg p-6" />;
            case 'company_size':
                return (
                    <RadioGroup onValueChange={(value) => handleRadioChange('company_size', value)} defaultValue={formData.company_size} className="space-y-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="micro" id="size_micro" /><Label htmlFor="size_micro">Microempresa</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="pequena" id="size_pequena" /><Label htmlFor="size_pequena">Pequeña empresa</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="mediana" id="size_mediana" /><Label htmlFor="size_mediana">Mediana empresa</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="grande" id="size_grande" /><Label htmlFor="size_grande">Gran empresa o Corporación</Label></div>
                    </RadioGroup>
                );
            case 'assets':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.keys(complexityPoints.assets).map(asset => (
                            <div key={asset} className={`flex flex-col justify-between p-3 rounded-md transition-all duration-200 ${formData.assets.includes(asset) ? 'bg-cyan-50 border-cyan-400' : 'bg-gray-100 border-gray-200'} border`}>
                                <div className="flex justify-between items-start">
                                    <Label htmlFor={asset} className="text-sm font-medium text-gray-800 cursor-pointer flex-grow">
                                        {
                                            asset === 'CRM' ? 'CRM' :
                                            asset === 'ERP' ? 'ERP' :
                                            asset === 'otherPlatforms' ? 'Otras plataformas' :
                                            asset.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                                        }
                                    </Label>
                                    <Checkbox id={asset} checked={formData.assets.includes(asset)} onCheckedChange={() => handleCheckboxChange(asset)} />
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="self-start mt-2"><Info className="w-3 h-3 text-gray-400" /></TooltipTrigger>
                                        <TooltipContent><p>{tooltips[asset as keyof typeof tooltips]}</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </div>
                );
            case 'database':
                return (
                    <RadioGroup onValueChange={(value) => handleRadioChange('database', value)} defaultValue={formData.database} className="flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="db_si" /><Label htmlFor="db_si">Sí</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="db_no" /><Label htmlFor="db_no">No</Label></div>
                    </RadioGroup>
                );
            case 'database_size':
                return (
                    <RadioGroup onValueChange={(value) => handleRadioChange('database_size', value)} defaultValue={formData.database_size} className="space-y-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="menos_100" id="size_1" /><Label htmlFor="size_1">Menos de 100 contactos</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="entre_100_500" id="size_2" /><Label htmlFor="size_2">Entre 100 y 500 contactos</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="entre_500_1000" id="size_3" /><Label htmlFor="size_3">Entre 500 y 1.000 contactos</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="mas_1000" id="size_4" /><Label htmlFor="size_4">Más de 1.000 contactos</Label></div>
                    </RadioGroup>
                );
            case 'website':
                return <Input name="website" placeholder="tuempresa.com" value={formData.website} onChange={handleInputChange} className="text-lg p-6" />;
            case 'businessModel':
                return (
                    <RadioGroup onValueChange={(value) => handleRadioChange('businessModel', value)} defaultValue={formData.businessModel} className="grid grid-cols-2 gap-4">
                        {Object.keys(complexityPoints.businessModel).map(model => (
                            <Label key={model} htmlFor={model} className={`flex flex-col justify-between p-3 rounded-md cursor-pointer transition-all duration-200 ${formData.businessModel === model ? 'bg-cyan-50 border-cyan-400' : 'bg-gray-100 border-gray-200'} border hover:border-cyan-400`}>
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-medium text-gray-800">{model.toUpperCase().replace('_', ' & ')}</span>
                                    <RadioGroupItem value={model} id={model} />
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger type="button" className="self-start mt-2" onClick={(e) => e.preventDefault()}><Info className="w-3 h-3 text-gray-400" /></TooltipTrigger>
                                        <TooltipContent><p>{tooltips[model as keyof typeof tooltips]}</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
                        ))}
                    </RadioGroup>
                );
            case 'ecommerce':
                 return (
                    <RadioGroup onValueChange={(value) => handleRadioChange('ecommerce', value)} defaultValue={formData.ecommerce} className="flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="ecom_si" /><Label htmlFor="ecom_si">Sí</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ecom_no" /><Label htmlFor="ecom_no">No</Label></div>
                    </RadioGroup>
                );
            case 'competitors':
                return (
                    <div className="space-y-2">
                        {formData.competitors.map((c, i) => (
                            <Input key={i} name={`competitor_${i}`} placeholder={`Competidor ${i + 1}`} value={c} onChange={(e) => handleCompetitorChange(i, e.target.value)} className="text-lg p-6" />
                        ))}
                    </div>
                );
            case 'email':
                return <Input type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleInputChange} className="text-lg p-6" />;
            default:
                return null;
        }
    };

    const currentQuestion = () => {
        const step = steps[currentStep];
        switch (step.id) {
            case 'name': return 'Primero, ¿cuál es tu nombre?';
            case 'company': return `Hola ${formData.name}, ¿cuál es el nombre de tu empresa?`;
            case 'industry': return '¿Cuál es tu industria o mercado?';
            case 'company_size': return '¿De qué tamaño es tu empresa?';
            case 'assets': return '¿Cuáles de estas plataformas tienes configuradas y utilizas?';
            case 'database': return '¿Cuentas con bases de datos de clientes o prospectos?';
            case 'database_size': return '¿De qué tamaño es tu base de datos?';
            case 'website': return 'Perfecto. ¿Cuál es la URL de tu sitio web?';
            case 'ecommerce': return '¿Tu sitio web tiene ecommerce?';
            case 'competitors': return '¿Qué marcas son tus competidores directos? (Menciona al menos 3)';
            case 'businessModel': return 'Y por último, ¿Cuál es tu modelo de negocio en el canal digital?';
            case 'email': return '¿A qué mail te enviamos la cotización?';
            default: return '';
        }
    };

    const isNextDisabled = () => {
        const step = steps[currentStep];
        switch (step.id) {
            case 'name': return !formData.name;
            case 'company': return !formData.company;
            case 'industry': return !formData.industry;
            case 'company_size': return !formData.company_size;
            case 'assets': return formData.assets.length === 0;
            case 'database': return !formData.database;
            case 'database_size': return formData.database === 'si' && !formData.database_size;
            case 'website': return !formData.website;
            case 'website':
                const urlRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
                return !urlRegex.test(formData.website);
            case 'ecommerce': return !formData.ecommerce;
            case 'competitors': return formData.competitors.filter(c => c.trim() !== '').length < 3;
            case 'businessModel': return !formData.businessModel;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(formData.email);
            default: return true;
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto w-full text-gray-900 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 md:mb-8">Cotiza tu Diagnóstico</h3>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="grid md:grid-cols-2 gap-12">
                {/* Columna de resultado (oculta en móvil) */}
                <div className="hidden md:flex bg-gray-50 rounded-xl p-8 flex-col justify-center items-center text-center order-2 md:order-1">
                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <h4 className="font-bold text-xl text-gray-800 mb-8">Completa el formulario para conocer el valor de tu diagnóstico.</h4>
                                <motion.div
                                    initial={{ x: 0 }}
                                    animate={{ x: [10, 0, 10] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: '#00bcd4', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#9c00ff', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <path d="M5 12H19" stroke="url(#arrowGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="url(#arrowGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                                <h4 className="font-bold text-lg text-gray-800">Valor estimado del Diagnóstico</h4>
                                <p className="text-sm text-gray-500 mb-4">Basado en la complejidad de tus activos.</p>
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">
                                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(calculateTotal)}
                                </div>
                                <p className="text-gray-600 mt-2 font-semibold">+ IVA</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="text-left text-xs text-gray-500 mt-6 border-t pt-4 w-full">
                        <p className="font-semibold mb-2">Este valor incluye:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Semáforo de evaluación general y por canal.</li>
                            <li>Análisis y auditoría técnica completa.</li>
                            <li>Análisis de contenidos y anuncios.</li>
                            <li>Informe en detalle del estado de los canales digitales.</li>
                            <li>Análisis Competitivo (Benchmarking)</li>
                            <li>Análisis de Mercado</li>
                            <li>Espacios de mejora, hallazgos y oportunidades.</li>
                            <li>Reunión de presentación de resultados.</li>
                        </ul>
                        <p className="mt-4 italic">El valor final puede variar y será confirmado en la propuesta comercial. Cuentas, accesos y data comercial, proporcionada por el cliente.</p>
                    </div>
                </div>

                {/* Columna del formulario (ahora a la derecha) */}
                <div className="flex flex-col order-1 md:order-2">
                    <AnimatePresence mode="wait">
                        {!showResult ? (
                        <motion.div key="form-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Progress value={progress} className="mb-4" />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-semibold mb-6">{currentQuestion()}</h3>
                                    {renderStep()}
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex justify-between items-center mt-8">
                                {currentStep > 0 && (
                                    <Button type="button" variant="ghost" onClick={handlePrev}>Anterior</Button>
                                )}
                                {currentStep < steps.length - 1 ? (
                                    <Button type="button" onClick={handleNext} disabled={isNextDisabled()} className="ml-auto">Siguiente</Button>
                                ) : (
                            <Button type="submit" disabled={isSubmitting || isNextDisabled()} className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg w-32">
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Cotizar'}
                            </Button>
                                )}
                            </div>
                        </motion.div>
                        ) : (
                            <motion.div key="form-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
                                 <h3 className="text-2xl font-bold text-gray-900">Gracias por cotizar tu diagnóstico.</h3>
                                 <p className="text-gray-600 mt-2">Pronto nos pondremos en contacto a tu correo.</p>
                            </motion.div>
                        )}

                        {/* "Este valor incluye..." box - visible solo antes de que se muestre el resultado */}
                        {!showResult && (
                            <div className="text-left text-xs text-gray-500 mt-10 border-t pt-6 w-full bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Este valor incluye:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Semáforo de evaluación general y por canal.</li>
                                    <li>Análisis y auditoría técnica completa.</li>
                                    <li>Análisis de contenidos y anuncios.</li>
                                    <li>Informe en detalle del estado de los canales digitales.</li>
                                    <li>Análisis Competitivo (Benchmarking)</li>
                                    <li>Análisis de Mercado</li>
                                    <li>Espacios de mejora, hallazgos y oportunidades.</li>
                                    <li>Reunión de presentación de resultados.</li>
                                </ul>
                                <p className="mt-4 italic">El valor final puede variar y será confirmado en la propuesta comercial. Cuentas, accesos y data comercial, proporcionada por el cliente.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </div>
    );
}
