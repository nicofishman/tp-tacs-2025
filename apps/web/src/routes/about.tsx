// routes/about.tsx
import type { Route } from "react-router";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

export function meta(): any[] {
  return [
    { title: "Acerca de Nosotros - Mi Aplicación" },
    { name: "description", content: "Conoce más sobre nuestra empresa y equipo" },
  ];
}

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: "Ana García",
    position: "CEO & Fundadora",
    bio: "Con más de 10 años de experiencia en tecnología y liderazgo empresarial",
    image: "/api/placeholder/200/200",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 2,
    name: "Carlos López",
    position: "CTO",
    bio: "Experto en desarrollo de software y arquitectura de sistemas escalables",
    image: "/api/placeholder/200/200",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: 3,
    name: "María Rodriguez",
    position: "Directora de Marketing",
    bio: "Especialista en estrategias digitales y comunicación efectiva",
    image: "/api/placeholder/200/200",
    linkedin: "#",
    twitter: "#"
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Siempre buscamos nuevas formas de mejorar y evolucionar"
  },
  {
    icon: Heart,
    title: "Transparencia",
    description: "Comunicación honesta y abierta en todas nuestras relaciones"
  },
  {
    icon: Target,
    title: "Calidad",
    description: "Excelencia en todo lo que hacemos, sin compromisos"
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Creemos que trabajamos mejor cuando trabajamos juntos"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Acerca de Nosotros</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Conoce nuestra historia, misión y el increíble equipo que hace posible todo esto
          </p>
        </div>
      </section>

      {/* Historia y Misión */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fundada en 2020, nuestra empresa nació con la visión de crear soluciones 
                  tecnológicas innovadoras que transformen la manera en que las personas 
                  interactúan con la tecnología.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Desde nuestros humildes comienzos en un pequeño garaje, hemos 
                  crecido hasta convertirnos en líderes en nuestro sector, siempre 
                  manteniendo nuestros valores fundamentales.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Democratizar el acceso a la tecnología de vanguardia, creando productos 
                  que no solo resuelvan problemas, sino que inspiren a las personas a 
                  alcanzar su máximo potencial.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Creemos que la tecnología debe ser accesible, intuitiva y 
                  verdaderamente útil para mejorar la vida de las personas.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestros Valores</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas apasionadas que hacen posible nuestra misión
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
                    👤
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a href={member.linkedin} className="text-blue-600 hover:text-blue-800 transition-colors">
                    LinkedIn
                  </a>
                  <a href={member.twitter} className="text-blue-400 hover:text-blue-600 transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestro Impacto</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Números que reflejan nuestro compromiso y crecimiento
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-blue-100">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Proyectos Completados</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5</div>
              <p className="text-blue-100">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Soporte Disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Quieres trabajar con nosotros?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Estamos siempre buscando talento excepcional para unirse a nuestro equipo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Ver Ofertas de Trabajo
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Enviar CV
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}