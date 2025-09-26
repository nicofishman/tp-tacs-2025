// routes/contact.tsx

import { useForm } from "@tanstack/react-form";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

// biome-ignore lint/suspicious/noExplicitAny: temporal
export function meta(): any[] {
  return [
    { title: "Contacto - Mi Aplicación" },
    { content: "Ponte en contacto con nosotros", name: "description" },
  ];
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      try {
        // Simular envío del formulario
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Formulario enviado:", value);
        toast.success("¡Mensaje enviado correctamente!");

        // Reset form
        form.reset();
      } catch (_error) {
        toast.error("Error al enviar el mensaje. Intenta de nuevo.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Contáctanos</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Estamos aquí para ayudarte. No dudes en contactarnos para cualquier
            consulta
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-bold text-3xl text-gray-900">
                  Información de Contacto
                </h2>
                <p className="mb-8 text-gray-600">
                  Puedes contactarnos a través de cualquiera de estos medios.
                  Nos comprometemos a responder en menos de 24 horas.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Dirección
                    </h3>
                    <p className="text-gray-600">
                      Av. Corrientes 1234, Piso 8<br />
                      Ciudad Autónoma de Buenos Aires
                      <br />
                      Argentina (C1043AAZ)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Teléfono
                    </h3>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-gray-500 text-sm">WhatsApp disponible</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@miempresa.com</p>
                    <p className="text-gray-600">soporte@miempresa.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Horarios de Atención
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Lunes - Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 10:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
            </div>

            {/* Formulario de contacto */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 font-bold text-3xl text-gray-900">
                Envíanos un Mensaje
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <form.Field name="name">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-2 block font-semibold text-gray-700 text-sm"
                      >
                        Nombre Completo
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-2 block font-semibold text-gray-700 text-sm"
                      >
                        Email
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="subject">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-2 block font-semibold text-gray-700 text-sm"
                      >
                        Asunto
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Asunto del mensaje"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="message">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-2 block font-semibold text-gray-700 text-sm"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={5}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300",
                    isSubmitting
                      ? "cursor-not-allowed opacity-70"
                      : "hover:bg-blue-700 hover:shadow-lg",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-16">
            <h2 className="mb-8 text-center font-bold text-3xl text-gray-900">
              Nuestra Ubicación
            </h2>
            <div className="rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 p-8 text-center">
              <div className="mx-auto max-w-2xl">
                <div className="mb-4 text-6xl">🗺️</div>
                <p className="mb-4 text-gray-700 text-lg">
                  Aquí iría un mapa interactivo mostrando nuestra ubicación
                </p>
                <p className="text-gray-600">
                  Puedes integrar Google Maps, Mapbox u otro servicio de mapas
                  aquí
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
