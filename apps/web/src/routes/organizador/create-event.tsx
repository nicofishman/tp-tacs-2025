// routes/create-event.tsx

import { EventForm } from "@web/components/events/EventForm";
import { api } from "@web/lib/fetch";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function meta(): Array<Record<string, string>> {
  return [
    { title: "Crear Evento - Mi Aplicación" },
    { content: "Crea un nuevo evento para la comunidad", name: "description" },
  ];
}

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (
    data: Parameters<typeof api.eventos.post>[0] | undefined,
  ) => {
    if (!data) return;
    try {
      await api.eventos.post(data);
      toast.success("¡Evento creado exitosamente!");
      navigate("/dashboard");
    } catch {
      toast.error("Error al crear el evento.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Crear Nuevo Evento</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Comparte tu conocimiento y conecta con la comunidad organizando un
            evento increíble
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <EventForm mode="create" onSubmit={handleCreate} />
        </div>
      </section>
    </div>
  );
}
