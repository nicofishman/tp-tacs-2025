import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Button } from "@web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import type { api } from "@web/lib/fetch";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Save,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

type CreateEventBody = Parameters<typeof api.eventos.post>[0];
export interface EventFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<CreateEventBody>;
  onSubmit: (data: CreateEventBody) => Promise<void> | void;
  submitLabel?: string;
  categories: { label: string; value?: string }[];
  loadingCategories?: boolean;
}

export function EventForm({
  mode,
  initialValues,
  onSubmit,
  submitLabel,
  categories,
  loadingCategories = false,
}: EventFormProps) {
  const defaultValues: CreateEventBody = useMemo(
    () => ({
      categoriaId: "",
      cupoMaximo: 1,
      cupoMinimo: 0,
      descripcion: "",
      duracion: { horas: 0, minutos: 0 },
      fechaInicio: "",
      precio: 0,
      titulo: "",
      ubicacion: { direccion: "", lat: 0, lng: 0 },
      ...(initialValues as CreateEventBody | undefined),
    }),
    [initialValues],
  );

  const [formData, setFormData] = useState<CreateEventBody>(defaultValues);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  // categories are provided by the parent route (server-side fetched)

  function updateField<T extends keyof CreateEventBody>(
    field: T,
    value: CreateEventBody[T],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function updateDuracion<T extends "horas" | "minutos">(
    field: T,
    value: CreateEventBody["duracion"][T],
  ) {
    setFormData((prev) => ({
      ...prev,
      duracion: { ...prev.duracion, [field]: value },
    }));
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.titulo.trim()) newErrors.titulo = "El título es requerido";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es requerida";
    if (!formData.fechaInicio)
      newErrors.fechaInicio = "La fecha de inicio es requerida";
    if (!formData.categoriaId)
      newErrors.categoriaId = "La categoría es requerida";
    if (formData.cupoMaximo < 1)
      newErrors.cupoMaximo = "El cupo máximo debe ser mayor a 0";
    if (formData.cupoMinimo > formData.cupoMaximo)
      newErrors.cupoMinimo = "El cupo mínimo no puede ser mayor al máximo";
    if (formData.precio < 0)
      newErrors.precio = "El precio no puede ser negativo";
    if (formData.duracion.horas === 0 && formData.duracion.minutos === 0)
      newErrors.duracion = "La duración debe ser mayor a 0";
    if (!formData.ubicacion.direccion.trim())
      newErrors.direccion = "La dirección es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await Promise.resolve(onSubmit(formData));
    } finally {
      setIsSubmitting(false);
    }
  };

  function onPlaceSelect(value: {
    properties: {
      formatted: string;
      lat: number;
      lon: number;
    };
  }) {
    setFormData((prev) => ({
      ...prev,
      ubicacion: {
        ...prev.ubicacion,
        direccion: value.properties.formatted,
        lat: value.properties.lat,
        lng: value.properties.lon,
      },
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Plus className="h-5 w-5" />
            Información Básica
          </CardTitle>
          <CardDescription>Detalles principales de tu evento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => updateField("titulo", e.target.value)}
              />
              {errors.titulo && <p className="text-red-500">{errors.titulo}</p>}
            </div>

            <div>
              <Label htmlFor="categoria">Categoría *</Label>
              <select
                id="categoria"
                value={formData.categoriaId}
                onChange={(e) => updateField("categoriaId", e.target.value)}
                disabled={loadingCategories}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.categoriaId && (
                <p className="text-red-500">{errors.categoriaId}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción *</Label>
            <textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => updateField("descripcion", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            {errors.descripcion && (
              <p className="text-red-500">{errors.descripcion}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Calendar className="h-5 w-5" />
            Fecha y Duración
          </CardTitle>
          <CardDescription className="text-gray-600">
            Cuándo se realizará tu evento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha y Hora de Inicio *</Label>
              <Input
                id="fechaInicio"
                type="datetime-local"
                value={
                  formData.fechaInicio
                    ? format(
                        new Date(formData.fechaInicio),
                        "yyyy-MM-dd'T'HH:mm",
                      )
                    : ""
                }
                onChange={(e) =>
                  updateField(
                    "fechaInicio",
                    new Date(e.target.value).toISOString(),
                  )
                }
              />
              {errors.fechaInicio && (
                <p className="text-red-500 text-sm">{errors.fechaInicio}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Duración *</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Horas"
                    min="0"
                    value={formData.duracion.horas || ""}
                    onChange={(e) =>
                      updateDuracion(
                        "horas",
                        Number.parseInt(e.target.value, 10) || 0,
                      )
                    }
                    className={errors.duracion ? "border-red-500" : ""}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Minutos"
                    min="0"
                    max="59"
                    value={formData.duracion.minutos || ""}
                    onChange={(e) =>
                      updateDuracion(
                        "minutos",
                        Number.parseInt(e.target.value, 10) || 0,
                      )
                    }
                    className={errors.duracion ? "border-red-500" : ""}
                  />
                </div>
              </div>
              {errors.duracion && (
                <p className="text-red-500 text-sm">{errors.duracion}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <MapPin className="h-5 w-5" />
            Ubicación
          </CardTitle>
          <CardDescription className="text-gray-600">
            Dónde se realizará tu evento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección *</Label>
            <Input
              id="direccion"
              placeholder="Ej: Av. Libertador 1234, CABA"
              value={formData.ubicacion.direccion}
              onChange={(e) => updateUbicacion("direccion", e.target.value)}
              className={errors.direccion ? "border-red-500" : ""}
            />
            {errors.direccion && (
              <p className="text-red-500 text-sm">{errors.direccion}</p>
            )}
          </div><div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitud</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                placeholder="-34.6037"
                value={formData.ubicacion.lat || ""}
                onChange={(e) =>
                  updateUbicacion("lat", Number.parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lng">Longitud</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                placeholder="-58.3816"
                value={formData.ubicacion.lng || ""}
                onChange={(e) =>
                  updateUbicacion("lng", Number.parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div> */}
          <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeSelect={onPlaceSelect}
              placeholder="Buscar ubicación"
              value={formData.ubicacion.direccion}
            />
          </GeoapifyContext>
        </CardContent>
      </Card>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5" />
            Capacidad y Precio
          </CardTitle>
          <CardDescription className="text-gray-600">
            Cuántas personas pueden participar y cuánto cuesta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cupoMaximo">Cupo Máximo *</Label>
              <Input
                id="cupoMaximo"
                type="number"
                min="1"
                placeholder="50"
                value={formData.cupoMaximo || ""}
                onChange={(e) =>
                  updateField(
                    "cupoMaximo",
                    Number.parseInt(e.target.value, 10) || 1,
                  )
                }
                className={errors.cupoMaximo ? "border-red-500" : ""}
              />
              {errors.cupoMaximo && (
                <p className="text-red-500 text-sm">{errors.cupoMaximo}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cupoMinimo">Cupo Mínimo</Label>
              <Input
                id="cupoMinimo"
                type="number"
                min="0"
                placeholder="10"
                value={formData.cupoMinimo || ""}
                onChange={(e) =>
                  updateField(
                    "cupoMinimo",
                    Number.parseInt(e.target.value, 10) || 0,
                  )
                }
                className={errors.cupoMinimo ? "border-red-500" : ""}
              />
              {errors.cupoMinimo && (
                <p className="text-red-500 text-sm">{errors.cupoMinimo}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio (ARS)</Label>
              <Input
                id="precio"
                type="number"
                min="0"
                placeholder="0"
                value={formData.precio || ""}
                onChange={(e) =>
                  updateField("precio", Number.parseFloat(e.target.value) || 0)
                }
                className={errors.precio ? "border-red-500" : ""}
              />
              {errors.precio && (
                <p className="text-red-500 text-sm">{errors.precio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Vista Previa</CardTitle>
          <CardDescription className="text-gray-600">
            Así se verá tu evento en la lista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
            <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="rounded-full bg-black/30 px-3 py-1 font-medium text-sm backdrop-blur-sm">
                  {formData.categoriaId
                    ? categories.find((c) => c.value === formData.categoriaId)
                        ?.label || "Categoría"
                    : "Categoría"}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-3 font-bold text-2xl text-gray-900">
                {formData.titulo || "Título del evento"}
              </h3>
              <div className="mb-4 space-y-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formData.fechaInicio
                      ? new Date(formData.fechaInicio).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            weekday: "long",
                            year: "numeric",
                          },
                        )
                      : "Fecha por definir"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formData.fechaInicio
                      ? new Date(formData.fechaInicio).toLocaleTimeString(
                          "es-ES",
                          { hour: "2-digit", minute: "2-digit" },
                        )
                      : "Hora por definir"}{" "}
                    •{" "}
                    {formData.duracion.horas || formData.duracion.minutos
                      ? `${formData.duracion.horas}h ${formData.duracion.minutos}min`
                      : "Duración por definir"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {formData.ubicacion.direccion || "Ubicación por definir"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    Máximo {formData.cupoMaximo} participantes
                    {formData.cupoMinimo > 0 &&
                      ` • Mínimo ${formData.cupoMinimo}`}
                  </span>
                </div>
              </div>
              <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                {formData.descripcion ||
                  "Descripción del evento aparecerá aquí..."}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-2xl text-blue-600">
                    {formData.precio}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setFormData(defaultValues)}
        >
          <X className="h-4 w-4" /> Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4" />
          {isSubmitting
            ? mode === "create"
              ? "Creando..."
              : "Guardando..."
            : (submitLabel ??
              (mode === "create" ? "Crear Evento" : "Guardar Cambios"))}
        </Button>
      </div>
    </form>
  );
}
