import type React from "react";

interface EventsHeaderProps {
  /** Texto principal del encabezado */
  title: string;
}

export const EventsHeader: React.FC<EventsHeaderProps> = ({ title }) => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
    <div className="container mx-auto px-4 text-center">
      <h1 className="mb-4 font-bold text-5xl">{title}</h1>
    </div>
  </section>
);
