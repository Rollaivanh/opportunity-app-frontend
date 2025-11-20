import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="w-full">
      {/* ============================
          HERO FULLSCREEN
      ============================= */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center px-8">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl w-full flex items-center justify-between">
          {/* Left text */}
          <div className="max-w-lg text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Tu próximo trabajo empieza con una buena estrategia.
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Gestioná tus postulaciones y practicá entrevistas reales con
              inteligencia artificial.
            </p>
          </div>

          {/* Right card */}
          <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
              Empezá ahora
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="w-full text-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 1 - ¿CÓMO FUNCIONA?
      ============================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ¿Cómo funciona OpportunityApp?
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Organizá tus postulaciones, seguí tu progreso y practicá entrevistas
            con una IA que se adapta al puesto al que aplicás. Todo desde un
            solo lugar, diseñado para ayudarte a conseguir tu próximo trabajo
            más rápido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">
                1. Cargá tus búsquedas
              </h3>
              <p className="text-gray-600">
                Guardá las ofertas laborales que te interesan y gestioná todo
                desde un tablero simple y ordenado.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">
                2. Seguimiento automático
              </h3>
              <p className="text-gray-600">
                Trackeá el estado de cada postulación y recibí estadísticas para
                mejorar tus posibilidades.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">
                3. Practicá entrevistas reales
              </h3>
              <p className="text-gray-600">
                Usá nuestro agente de IA para simular entrevistas técnicas o de
                RRHH antes de enfrentarte a las reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 2 - BENEFICIOS
      ============================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Lo que hace diferente a OpportunityApp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Personalizado por IA
              </h3>
              <p className="text-gray-600">
                La entrevista se adapta a tu puesto, tu experiencia y tu perfil.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Mejores decisiones
              </h3>
              <p className="text-gray-600">
                Analizá tus postulaciones con métricas reales para mejorar tu
                estrategia.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Ahorro de tiempo</h3>
              <p className="text-gray-600">
                Unificá buscador, seguimiento y práctica en un solo lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 3 - IA FOCUS
      ============================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hecha con IA para potenciar tu carrera
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro sistema usa modelos avanzados de lenguaje y agentes de voz
            para simular entrevistas que replican la experiencia real de un
            proceso laboral.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION 4 - CTA FINAL
      ============================= */}
      <section className="py-24 bg-green-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          ¿Listo para mejorar tus entrevistas?
        </h2>
        <p className="text-lg mb-8">
          Unite gratis y empezá a practicar con IA.
        </p>

        <Link
          href="/register"
          className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
        >
          Crear cuenta
        </Link>
      </section>
    </main>
  );
}
