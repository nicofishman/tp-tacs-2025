import type React from "react";

export const EventsHeader: React.FC = () => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
    <div className="container mx-auto px-4 text-center">
      <h1 className="mb-4 font-bold text-5xl">Próximos Eventos</h1>
      <p className="mx-auto max-w-2xl text-blue-100 text-xl">
        Únete a nosotros en estas increíbles experiencias de aprendizaje y
        networking
      </p>
    </div>
  </section>
);
