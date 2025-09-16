// routes/home.tsx (o _index.tsx según tu preferencia)
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Inicio - Mi Aplicación" },
    { content: "Bienvenido a nuestra aplicación", name: "description" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text font-bold text-5xl text-transparent md:text-7xl">
            Bienvenido a Mi Aplicación
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-gray-100 text-xl md:text-2xl">
            Descubre todo lo que tenemos para ofrecerte en un solo lugar
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/events"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              Ver Eventos
            </Link>
            <Link
              to="/about"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
            >
              Conocer Más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900">
              Características Principales
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-xl">
              Todo lo que necesitas en una plataforma moderna y fácil de usar
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Eventos</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 font-bold text-2xl text-gray-900">Eventos</h3>
              <p className="text-gray-600">
                Mantente al día con nuestros próximos eventos y actividades
                especiales
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Comunidad</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 font-bold text-2xl text-gray-900">
                Comunidad
              </h3>
              <p className="text-gray-600">
                Únete a nuestra comunidad activa y conecta con personas afines
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Soporte</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 font-bold text-2xl text-gray-900">Soporte</h3>
              <p className="text-gray-600">
                Estamos aquí para ayudarte con cualquier pregunta o problema
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-bold text-4xl">¿Listo para comenzar?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-blue-100 text-xl">
            Únete a miles de usuarios que ya confían en nosotros
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            Contáctanos Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
