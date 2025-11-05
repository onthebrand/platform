// src/app/page.tsx
// Esta es la NUEVA página de inicio de On the Brand
// --- CÓDIGO ACTUALIZADO (Limpio) ---



// El <GlobalHeader /> se renderiza automáticamente desde layout.tsx

export default function Home() {

  return (

    <main style={{ padding: '5rem 2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>

        Onthebrand

      </h1>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#666', marginTop: '1rem' }}>

        Agencia | Consultora | Plataforma

      </h2>



      <div style={{ marginTop: '3rem' }}>

        <p style={{ color: '#888' }}>

          (Esta es la nueva página de inicio. El contenido anterior ahora vive en /plataforma)

        </p>

      </div>

    </main>

  );

}
