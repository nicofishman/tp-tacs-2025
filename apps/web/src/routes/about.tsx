import { Heart, Lightbulb, Target, Users } from "lucide-react";

// biome-ignore lint/suspicious/noExplicitAny: temporal
export function meta(): any[] {
  return [
    { title: "Acerca de Nosotros - Mi Aplicación" },
    {
      content: "Conoce más sobre nuestra empresa y equipo",
      name: "description",
    },
  ];
}

// Datos del equipo
const teamMembers = [
  {
    bio: "Con más de 10 años de experiencia en tecnología y liderazgo empresarial",
    id: 1,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Gad Stamati",
    position: "PM",
    twitter: "#",
  },
  {
    bio: "Experto en desarrollo de software y arquitectura de sistemas escalables",
    id: 2,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Nicolas Fishman",
    position: "Tech Lead",
    twitter: "#",
  },
  {
    bio: "Especialista en estrategias digitales y comunicación efectiva",
    id: 3,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Alan Garber",
    position: "Sr Backend Engineer",
    twitter: "#",
  },
  {
    bio: "Especialista en estrategias digitales y comunicación efectiva",
    id: 3,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Ramiro Remesaro",
    position: "Sr Backend Engineer",
    twitter: "#",
  },
  {
    bio: "Especialista en estrategias digitales y comunicación efectiva",
    id: 3,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Eitan Fiszer",
    position: "Sr Backend Engineer",
    twitter: "#",
  },
  {
    bio: "Especialista en estrategias digitales y comunicación efectiva",
    id: 3,
    image: "/api/placeholder/200/200",
    linkedin: "#",
    name: "Agustin TACS",
    position: "Sr Backend Engineer",
    twitter: "#",
  },
];

const values = [
  {
    description: "Siempre buscamos nuevas formas de mejorar y evolucionar",
    icon: Lightbulb,
    title: "Innovación",
  },
  {
    description: "Comunicación honesta y abierta en todas nuestras relaciones",
    icon: Heart,
    title: "Transparencia",
  },
  {
    description: "Excelencia en todo lo que hacemos, sin compromisos",
    icon: Target,
    title: "Calidad",
  },
  {
    description: "Creemos que trabajamos mejor cuando trabajamos juntos",
    icon: Users,
    title: "Colaboración",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Acerca de Nosotros</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Conoce nuestra historia, misión y el increíble equipo que hace
            posible todo esto
          </p>
        </div>
      </section>

      {/* Historia y Misión */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 font-bold text-3xl text-gray-900">
                  Nuestra Historia
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Fundada en 2020, nuestra empresa nació con la visión de crear
                  soluciones tecnológicas innovadoras que transformen la manera
                  en que las personas interactúan con la tecnología.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Desde nuestros humildes comienzos en un pequeño garaje, hemos
                  crecido hasta convertirnos en líderes en nuestro sector,
                  siempre manteniendo nuestros valores fundamentales.
                </p>
              </div>

              <div>
                <h2 className="mb-6 font-bold text-3xl text-gray-900">
                  Nuestra Misión
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Democratizar el acceso a la tecnología de vanguardia, creando
                  productos que no solo resuelvan problemas, sino que inspiren a
                  las personas a alcanzar su máximo potencial.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Creemos que la tecnología debe ser accesible, intuitiva y
                  verdaderamente útil para mejorar la vida de las personas.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="mb-16">
              <h2 className="mb-12 text-center font-bold text-3xl text-gray-900">
                Nuestros Valores
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={value.title} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 text-xl">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900">
              Nuestro Equipo
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-xl">
              Conoce a las personas apasionadas que hacen posible nuestra misión
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-r from-blue-400 to-purple-500">
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-4xl text-gray-400">
                    👤
                  </div>
                </div>
                <h3 className="mb-2 font-bold text-2xl text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-4 font-semibold text-blue-600">
                  {member.position}
                </p>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href={member.linkedin}
                    className="text-blue-600 transition-colors hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.twitter}
                    className="text-blue-400 transition-colors hover:text-blue-600"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-4xl">Nuestro Impacto</h2>
            <p className="mx-auto max-w-2xl text-blue-100 text-xl">
              Números que reflejan nuestro compromiso y crecimiento
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 font-bold text-5xl">1000+</div>
              <p className="text-blue-100">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-5xl">50+</div>
              <p className="text-blue-100">Proyectos Completados</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-5xl">5</div>
              <p className="text-blue-100">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-5xl">24/7</div>
              <p className="text-blue-100">Soporte Disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-bold text-4xl text-gray-900">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl">
            Estamos siempre buscando talento excepcional para unirse a nuestro
            equipo
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Ver Ofertas de Trabajo
            </button>
            <button
              type="button"
              className="rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
            >
              Enviar CV
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
