// routes/contact.tsx
import type { Route } from "react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { cn } from "../lib/utils";

export function meta(): any[] {
  return [
    { title: "Contacto - Mi Aplicación" },
    { name: "description", content: "Ponte en contacto con nosotros" },
  ];
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      
      try {
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Formulario enviado:', value);
        toast.success('¡Mensaje enviado correctamente!');
        
        // Reset form
        form.reset();
      } catch (error) {
        toast.error('Error al enviar el mensaje. Intenta de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. No dudes en contactarnos para cualquier consulta
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Información de contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <p className="text-gray-600 mb-8">
                  Puedes contactarnos a través de cualquiera de estos medios. 
                  Nos comprometemos a responder en menos de 24 horas.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      Av. Corrientes 1234, Piso 8<br />
                      Ciudad Autónoma de Buenos Aires<br />
                      Argentina (C1043AAZ)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-sm text-gray-500">WhatsApp disponible</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@miempresa.com</p>
                    <p className="text-gray-600">soporte@miempresa.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horarios de Atención</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunes - Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 10:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Síguenos en redes sociales</h3>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-sky-400 text-white rounded-lg flex items-center justify-center hover:bg-sky-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <form.Field
                  name="name"
                  children={(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="email"
                  children={(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="subject"
                  children={(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                        Asunto
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Asunto del mensaje"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="message"
                  children={(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      />
                    </div>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300",
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-700 hover:shadow-lg"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nuestra Ubicación</h2>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-lg text-gray-700 mb-4">
                  Aquí iría un mapa interactivo mostrando nuestra ubicación
                </p>
                <p className="text-gray-600">
                  Puedes integrar Google Maps, Mapbox u otro servicio de mapas aquí
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}