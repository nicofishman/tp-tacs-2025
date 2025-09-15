// routes/events.tsx

import {
  Calendar,
  Clock,
  DollarSign,
  Filter,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// Interfaces basadas en tu DTO
interface Duracion {
  horas: number;
  minutos: number;
}

interface Ubicacion {
  nombre: string;
  direccion?: string;
  ciudad?: string;
  pais?: string;
  esVirtual: boolean;
  urlVirtual?: string;
}

interface CategoriaOutputDto {
  id: string;
  nombre: string;
  descripcion?: string;
}

interface UsuarioOutputDto {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
}

interface EventoOutputDto {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  duracion: Duracion;
  ubicacion: Ubicacion;
  cupoMaximo: number;
  cupoMinimo?: number;
  precio: number;
  categoria: CategoriaOutputDto;
  estado: string;
  organizador: UsuarioOutputDto;
}

// Filtros interface
interface EventFilters {
  categoria: string;
  fechaDesde: string;
  fechaHasta: string;
  ubicacion: string;
  precioMin: string;
  precioMax: string;
  palabrasClave: string;
  estado: string;
}

export function meta(): any[] {
  return [
    { title: "Eventos - Mi Aplicación" },
    { content: "Descubre nuestros próximos eventos", name: "description" },
  ];
}

// Datos de ejemplo con el nuevo formato
const mockEvents: EventoOutputDto[] = [
  {
    categoria: {
      descripcion: "Talleres prácticos",
      id: "1",
      nombre: "Workshops",
    },
    cupoMaximo: 60,
    cupoMinimo: 10,
    descripcion:
      "Aprende las últimas tecnologías web con expertos de la industria. Cubriremos React, TypeScript y mejores prácticas.",
    duracion: { horas: 4, minutos: 0 },
    estado: "activo",
    fechaInicio: "2024-03-15T10:00:00Z",
    id: "1",
    organizador: {
      email: "maria@example.com",
      id: "1",
      nombre: "María González",
    },
    precio: 0,
    titulo: "Workshop de Desarrollo Web",
    ubicacion: {
      ciudad: "Buenos Aires",
      direccion: "Av. Libertador 1234",
      esVirtual: false,
      nombre: "Centro de Conferencias TechHub",
      pais: "Argentina",
    },
  },
  {
    categoria: {
      descripcion: "Eventos de gran escala",
      id: "2",
      nombre: "Conferencias",
    },
    cupoMaximo: 200,
    cupoMinimo: 50,
    descripcion:
      "Las tendencias tecnológicas del futuro presentadas por líderes del sector. IA, Blockchain y más.",
    duracion: { horas: 8, minutos: 30 },
    estado: "activo",
    fechaInicio: "2024-03-22T09:00:00Z",
    id: "2",
    organizador: {
      email: "carlos@example.com",
      id: "2",
      nombre: "Carlos Ruiz",
    },
    precio: 12500,
    titulo: "Conferencia de Tecnología 2024",
    ubicacion: {
      ciudad: "Buenos Aires",
      direccion: "Lima 717",
      esVirtual: false,
      nombre: "Auditorio Principal UADE",
      pais: "Argentina",
    },
  },
  {
    categoria: {
      descripcion: "Eventos de networking",
      id: "3",
      nombre: "Networking",
    },
    cupoMaximo: 100,
    descripcion:
      "Conecta con profesionales de la industria en un ambiente relajado desde tu casa.",
    duracion: { horas: 2, minutos: 30 },
    estado: "activo",
    fechaInicio: "2024-03-29T18:00:00Z",
    id: "3",
    organizador: { email: "ana@example.com", id: "3", nombre: "Ana López" },
    precio: 5000,
    titulo: "Networking Night Virtual",
    ubicacion: {
      esVirtual: true,
      nombre: "Zoom Meeting",
      urlVirtual: "https://zoom.us/meeting123",
    },
  },
  {
    categoria: {
      descripcion: "Talleres prácticos",
      id: "1",
      nombre: "Workshops",
    },
    cupoMaximo: 30,
    cupoMinimo: 8,
    descripcion:
      "Mejora tus habilidades de diseño con casos reales y ejercicios prácticos usando Figma.",
    duracion: { horas: 6, minutos: 0 },
    estado: "activo",
    fechaInicio: "2024-04-05T14:00:00Z",
    id: "4",
    organizador: {
      email: "sofia@example.com",
      id: "4",
      nombre: "Sofía Martinez",
    },
    precio: 18750,
    titulo: "Masterclass de UX/UI Design",
    ubicacion: {
      ciudad: "Buenos Aires",
      direccion: "Palermo Soho, Gurruchaga 1423",
      esVirtual: false,
      nombre: "Laboratorio de Diseño CreativeSpace",
      pais: "Argentina",
    },
  },
  {
    categoria: {
      descripcion: "Cursos intensivos",
      id: "4",
      nombre: "Bootcamps",
    },
    cupoMaximo: 25,
    cupoMinimo: 15,
    descripcion:
      "Domina JavaScript ES6+, async/await, y patrones de diseño en una semana intensiva.",
    duracion: { horas: 40, minutos: 0 },
    estado: "activo",
    fechaInicio: "2024-04-12T09:00:00Z",
    id: "5",
    organizador: {
      email: "maria@example.com",
      id: "1",
      nombre: "María González",
    },
    precio: 45000,
    titulo: "Bootcamp de JavaScript Avanzado",
    ubicacion: {
      ciudad: "Buenos Aires",
      direccion: "Av. Corrientes 3247",
      esVirtual: false,
      nombre: "Campus Digital",
      pais: "Argentina",
    },
  },
];

export default function Events() {
  const [filters, setFilters] = useState<EventFilters>({
    categoria: "all",
    estado: "activo",
    fechaDesde: "",
    fechaHasta: "",
    palabrasClave: "",
    precioMax: "",
    precioMin: "",
    ubicacion: "all",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(mockEvents.map((event) => event.categoria.nombre)),
    );
    return [
      { label: "Todas las categorías", value: "all" },
      ...uniqueCategories.map((cat) => ({ label: cat, value: cat })),
    ];
  }, []);

  // Obtener ubicaciones únicas (solo físicas)
  const locations = useMemo(() => {
    const physicalEvents = mockEvents.filter(
      (event) => !event.ubicacion.esVirtual,
    );
    const uniqueLocations = Array.from(
      new Set(
        physicalEvents.map(
          (event) => event.ubicacion.ciudad || event.ubicacion.nombre,
        ),
      ),
    );
    return [
      { label: "Todas las ubicaciones", value: "all" },
      { label: "Eventos virtuales", value: "virtual" },
      ...uniqueLocations.map((loc) => ({ label: loc, value: loc })),
    ];
  }, []);

  // Filtrar eventos
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      // Filtro por categoría
      if (
        filters.categoria !== "all" &&
        event.categoria.nombre !== filters.categoria
      ) {
        return false;
      }

      // Filtro por estado
      if (filters.estado !== "all" && event.estado !== filters.estado) {
        return false;
      }

      // Filtro por fecha desde
      if (filters.fechaDesde) {
        const eventDate = new Date(event.fechaInicio);
        const filterDate = new Date(filters.fechaDesde);
        if (eventDate < filterDate) return false;
      }

      // Filtro por fecha hasta
      if (filters.fechaHasta) {
        const eventDate = new Date(event.fechaInicio);
        const filterDate = new Date(filters.fechaHasta);
        if (eventDate > filterDate) return false;
      }

      // Filtro por ubicación
      if (filters.ubicacion !== "all") {
        if (filters.ubicacion === "virtual") {
          if (!event.ubicacion.esVirtual) return false;
        } else {
          if (event.ubicacion.esVirtual) return false;
          const eventLocation =
            event.ubicacion.ciudad || event.ubicacion.nombre;
          if (eventLocation !== filters.ubicacion) return false;
        }
      }

      // Filtro por precio mínimo
      if (
        filters.precioMin &&
        event.precio < Number.parseFloat(filters.precioMin)
      ) {
        return false;
      }

      // Filtro por precio máximo
      if (
        filters.precioMax &&
        event.precio > Number.parseFloat(filters.precioMax)
      ) {
        return false;
      }

      // Filtro por palabras clave
      if (filters.palabrasClave) {
        const keywords = filters.palabrasClave.toLowerCase();
        const searchText =
          `${event.titulo} ${event.descripcion} ${event.organizador.nombre}`.toLowerCase();
        if (!searchText.includes(keywords)) return false;
      }

      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof EventFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      categoria: "all",
      estado: "activo",
      fechaDesde: "",
      fechaHasta: "",
      palabrasClave: "",
      precioMax: "",
      precioMin: "",
      ubicacion: "all",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat("es-AR", {
      currency: "ARS",
      style: "currency",
    }).format(price);
  };

  const formatDuration = (duracion: Duracion) => {
    if (duracion.horas === 0) {
      return `${duracion.minutos} min`;
    }
    if (duracion.minutos === 0) {
      return `${duracion.horas}h`;
    }
    return `${duracion.horas}h ${duracion.minutos}min`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoria !== "all") count++;
    if (filters.fechaDesde) count++;
    if (filters.fechaHasta) count++;
    if (filters.ubicacion !== "all") count++;
    if (filters.precioMin) count++;
    if (filters.precioMax) count++;
    if (filters.palabrasClave) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Próximos Eventos</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Únete a nosotros en estas increíbles experiencias de aprendizaje y
            networking
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Barra de búsqueda y filtros */}
          <div className="mb-8 space-y-4">
            {/* Búsqueda principal */}
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos por título, descripción u organizador..."
                value={filters.palabrasClave}
                onChange={(e) => updateFilter("palabrasClave", e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Toggle filtros */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Filtros avanzados
                {getActiveFiltersCount() > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-white text-xs">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {getActiveFiltersCount() > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Panel de filtros */}
            {showFilters && (
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Categoría */}
                  <div>
                    <label
                      htmlFor="categoria"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Categoría
                    </label>
                    <select
                      value={filters.categoria}
                      onChange={(e) =>
                        updateFilter("categoria", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ubicación */}
                  <div>
                    <label
                      htmlFor="ubicacion"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Ubicación
                    </label>
                    <select
                      value={filters.ubicacion}
                      onChange={(e) =>
                        updateFilter("ubicacion", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map((location) => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estado */}
                  <div>
                    <label
                      htmlFor="estado"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Estado
                    </label>
                    <select
                      value={filters.estado}
                      onChange={(e) => updateFilter("estado", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="activo">Activos</option>
                      <option value="cancelado">Cancelados</option>
                      <option value="finalizado">Finalizados</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Fecha desde */}
                  <div>
                    <label
                      htmlFor="fechaDesde"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Fecha desde
                    </label>
                    <input
                      type="date"
                      value={filters.fechaDesde}
                      onChange={(e) =>
                        updateFilter("fechaDesde", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Fecha hasta */}
                  <div>
                    <label
                      htmlFor="fechaHasta"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Fecha hasta
                    </label>
                    <input
                      type="date"
                      value={filters.fechaHasta}
                      onChange={(e) =>
                        updateFilter("fechaHasta", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Precio mínimo */}
                  <div>
                    <label
                      htmlFor="precioMin"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Precio mínimo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.precioMin}
                      onChange={(e) =>
                        updateFilter("precioMin", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Precio máximo */}
                  <div>
                    <label
                      htmlFor="precioMax"
                      className="mb-2 block font-medium text-gray-700 text-sm"
                    >
                      Precio máximo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="Sin límite"
                      value={filters.precioMax}
                      onChange={(e) =>
                        updateFilter("precioMax", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredEvents.length} de {mockEvents.length} eventos
            </p>
          </div>

          {/* Lista de eventos */}
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="hover:-translate-y-1 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="rounded-full bg-black/30 px-3 py-1 font-medium text-sm backdrop-blur-sm">
                      {event.categoria.nombre}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {event.ubicacion.esVirtual && (
                      <span className="rounded bg-green-500 px-2 py-1 font-medium text-white text-xs">
                        Virtual
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 font-bold text-2xl text-gray-900">
                    {event.titulo}
                  </h3>

                  <div className="mb-4 space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.fechaInicio)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatTime(event.fechaInicio)} •{" "}
                        {formatDuration(event.duracion)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {event.ubicacion.esVirtual
                          ? "Evento Virtual"
                          : `${event.ubicacion.nombre}, ${event.ubicacion.ciudad}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        Máximo {event.cupoMaximo} participantes
                        {event.cupoMinimo && ` • Mínimo ${event.cupoMinimo}`}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                    {event.descripcion}
                  </p>

                  <div className="mb-4 text-gray-500 text-xs">
                    Organizado por{" "}
                    <span className="font-medium">
                      {event.organizador.nombre}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="font-bold text-2xl text-blue-600">
                        {formatPrice(event.precio)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-200"
                      >
                        Más Info
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
                      >
                        Inscribirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 font-bold text-2xl text-gray-900">
                No se encontraron eventos
              </h3>
              <p className="mb-4 text-gray-600">
                No hay eventos que coincidan con los filtros seleccionados
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
