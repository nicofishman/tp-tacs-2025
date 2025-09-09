// routes/events.tsx
import type { Route } from "react-router";
import { useState, useMemo } from "react";
import { Calendar, MapPin, Clock, Users, Search, Filter, DollarSign, X } from "lucide-react";
import { cn } from "../lib/utils";

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
    { name: "description", content: "Descubre nuestros próximos eventos" },
  ];
}

// Datos de ejemplo con el nuevo formato
const mockEvents: EventoOutputDto[] = [
  {
    id: "1",
    titulo: "Workshop de Desarrollo Web",
    descripcion: "Aprende las últimas tecnologías web con expertos de la industria. Cubriremos React, TypeScript y mejores prácticas.",
    fechaInicio: "2024-03-15T10:00:00Z",
    duracion: { horas: 4, minutos: 0 },
    ubicacion: {
      nombre: "Centro de Conferencias TechHub",
      direccion: "Av. Libertador 1234",
      ciudad: "Buenos Aires",
      pais: "Argentina",
      esVirtual: false
    },
    cupoMaximo: 60,
    cupoMinimo: 10,
    precio: 0,
    categoria: { id: "1", nombre: "Workshops", descripcion: "Talleres prácticos" },
    estado: "activo",
    organizador: { id: "1", nombre: "María González", email: "maria@example.com" }
  },
  {
    id: "2",
    titulo: "Conferencia de Tecnología 2024",
    descripcion: "Las tendencias tecnológicas del futuro presentadas por líderes del sector. IA, Blockchain y más.",
    fechaInicio: "2024-03-22T09:00:00Z",
    duracion: { horas: 8, minutos: 30 },
    ubicacion: {
      nombre: "Auditorio Principal UADE",
      direccion: "Lima 717",
      ciudad: "Buenos Aires",
      pais: "Argentina",
      esVirtual: false
    },
    cupoMaximo: 200,
    cupoMinimo: 50,
    precio: 12500,
    categoria: { id: "2", nombre: "Conferencias", descripcion: "Eventos de gran escala" },
    estado: "activo",
    organizador: { id: "2", nombre: "Carlos Ruiz", email: "carlos@example.com" }
  },
  {
    id: "3",
    titulo: "Networking Night Virtual",
    descripcion: "Conecta con profesionales de la industria en un ambiente relajado desde tu casa.",
    fechaInicio: "2024-03-29T18:00:00Z",
    duracion: { horas: 2, minutos: 30 },
    ubicacion: {
      nombre: "Zoom Meeting",
      esVirtual: true,
      urlVirtual: "https://zoom.us/meeting123"
    },
    cupoMaximo: 100,
    precio: 5000,
    categoria: { id: "3", nombre: "Networking", descripcion: "Eventos de networking" },
    estado: "activo",
    organizador: { id: "3", nombre: "Ana López", email: "ana@example.com" }
  },
  {
    id: "4",
    titulo: "Masterclass de UX/UI Design",
    descripcion: "Mejora tus habilidades de diseño con casos reales y ejercicios prácticos usando Figma.",
    fechaInicio: "2024-04-05T14:00:00Z",
    duracion: { horas: 6, minutos: 0 },
    ubicacion: {
      nombre: "Laboratorio de Diseño CreativeSpace",
      direccion: "Palermo Soho, Gurruchaga 1423",
      ciudad: "Buenos Aires",
      pais: "Argentina",
      esVirtual: false
    },
    cupoMaximo: 30,
    cupoMinimo: 8,
    precio: 18750,
    categoria: { id: "1", nombre: "Workshops", descripcion: "Talleres prácticos" },
    estado: "activo",
    organizador: { id: "4", nombre: "Sofía Martinez", email: "sofia@example.com" }
  },
  {
    id: "5",
    titulo: "Bootcamp de JavaScript Avanzado",
    descripcion: "Domina JavaScript ES6+, async/await, y patrones de diseño en una semana intensiva.",
    fechaInicio: "2024-04-12T09:00:00Z",
    duracion: { horas: 40, minutos: 0 },
    ubicacion: {
      nombre: "Campus Digital",
      direccion: "Av. Corrientes 3247",
      ciudad: "Buenos Aires",
      pais: "Argentina",
      esVirtual: false
    },
    cupoMaximo: 25,
    cupoMinimo: 15,
    precio: 45000,
    categoria: { id: "4", nombre: "Bootcamps", descripcion: "Cursos intensivos" },
    estado: "activo",
    organizador: { id: "1", nombre: "María González", email: "maria@example.com" }
  }
];

export default function Events() {
  const [filters, setFilters] = useState<EventFilters>({
    categoria: "all",
    fechaDesde: "",
    fechaHasta: "",
    ubicacion: "all",
    precioMin: "",
    precioMax: "",
    palabrasClave: "",
    estado: "activo"
  });

  const [showFilters, setShowFilters] = useState(false);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(mockEvents.map(event => event.categoria.nombre)));
    return [
      { value: "all", label: "Todas las categorías" },
      ...uniqueCategories.map(cat => ({ value: cat, label: cat }))
    ];
  }, []);

  // Obtener ubicaciones únicas (solo físicas)
  const locations = useMemo(() => {
    const physicalEvents = mockEvents.filter(event => !event.ubicacion.esVirtual);
    const uniqueLocations = Array.from(new Set(
      physicalEvents.map(event => event.ubicacion.ciudad || event.ubicacion.nombre)
    ));
    return [
      { value: "all", label: "Todas las ubicaciones" },
      { value: "virtual", label: "Eventos virtuales" },
      ...uniqueLocations.map(loc => ({ value: loc, label: loc }))
    ];
  }, []);

  // Filtrar eventos
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Filtro por categoría
      if (filters.categoria !== "all" && event.categoria.nombre !== filters.categoria) {
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
          const eventLocation = event.ubicacion.ciudad || event.ubicacion.nombre;
          if (eventLocation !== filters.ubicacion) return false;
        }
      }

      // Filtro por precio mínimo
      if (filters.precioMin && event.precio < parseFloat(filters.precioMin)) {
        return false;
      }

      // Filtro por precio máximo
      if (filters.precioMax && event.precio > parseFloat(filters.precioMax)) {
        return false;
      }

      // Filtro por palabras clave
      if (filters.palabrasClave) {
        const keywords = filters.palabrasClave.toLowerCase();
        const searchText = `${event.titulo} ${event.descripcion} ${event.organizador.nombre}`.toLowerCase();
        if (!searchText.includes(keywords)) return false;
      }

      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof EventFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      categoria: "all",
      fechaDesde: "",
      fechaHasta: "",
      ubicacion: "all",
      precioMin: "",
      precioMax: "",
      palabrasClave: "",
      estado: "activo"
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Próximos Eventos</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Únete a nosotros en estas increíbles experiencias de aprendizaje y networking
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar eventos por título, descripción u organizador..."
                value={filters.palabrasClave}
                onChange={(e) => updateFilter("palabrasClave", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Toggle filtros */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtros avanzados
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Panel de filtros */}
            {showFilters && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={filters.categoria}
                      onChange={(e) => updateFilter("categoria", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ubicación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    <select
                      value={filters.ubicacion}
                      onChange={(e) => updateFilter("ubicacion", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {locations.map(location => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={filters.estado}
                      onChange={(e) => updateFilter("estado", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="activo">Activos</option>
                      <option value="cancelado">Cancelados</option>
                      <option value="finalizado">Finalizados</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Fecha desde */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha desde
                    </label>
                    <input
                      type="date"
                      value={filters.fechaDesde}
                      onChange={(e) => updateFilter("fechaDesde", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Fecha hasta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha hasta
                    </label>
                    <input
                      type="date"
                      value={filters.fechaHasta}
                      onChange={(e) => updateFilter("fechaHasta", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Precio mínimo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio mínimo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.precioMin}
                      onChange={(e) => updateFilter("precioMin", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Precio máximo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio máximo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="Sin límite"
                      value={filters.precioMax}
                      onChange={(e) => updateFilter("precioMax", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-black/30 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {event.categoria.nombre}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {event.ubicacion.esVirtual && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Virtual
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {event.titulo}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.fechaInicio)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(event.fechaInicio)} • {formatDuration(event.duracion)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {event.ubicacion.esVirtual 
                          ? "Evento Virtual" 
                          : `${event.ubicacion.nombre}, ${event.ubicacion.ciudad}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        Máximo {event.cupoMaximo} participantes
                        {event.cupoMinimo && ` • Mínimo ${event.cupoMinimo}`}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    {event.descripcion}
                  </p>

                  <div className="text-xs text-gray-500 mb-4">
                    Organizado por <span className="font-medium">{event.organizador.nombre}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(event.precio)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        Más Info
                      </button>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        Inscribirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron eventos
              </h3>
              <p className="text-gray-600 mb-4">
                No hay eventos que coincidan con los filtros seleccionados
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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