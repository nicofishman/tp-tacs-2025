import { EventForm } from "@web/components/events/EventForm";
import { api } from "@web/lib/fetch";
import { Suspense } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Await, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/edit-event";

type EditEventBody = Partial<Parameters<typeof api.eventos.post>[0]>;

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    throw new Response("Missing id", { status: 400 });
  }
  const res = await api.eventos({ id }).get();
  if (res.status !== 200 || !res.data) {
    throw new Response("Event not found", { status: 404 });
  }
  const e = res.data;
  const initialValues: EditEventBody = {
    categoriaId: e.categoria.id ?? "",
    cupoMaximo: e.cupoMaximo ?? 1,
    cupoMinimo: e.cupoMinimo ?? 0,
    descripcion: e.descripcion ?? "",
    duracion: e.duracion,
    fechaInicio: e.fechaInicio ?? "",
    precio: e.precio ?? 0,
    titulo: e.titulo ?? "",
    ubicacion: e.ubicacion,
  };
  const categories = api.categorias
    .get()
    .then((cRes) =>
      cRes.status === 200 && Array.isArray(cRes.data)
        ? cRes.data.map((c) => ({ label: c.nombre, value: c.id }))
        : [],
    );
  return { categories, initialValues };
}

export function meta(): Array<Record<string, string>> {
  return [
    { title: "Editar Evento - Mi Aplicación" },
    { content: "Edita un evento existente", name: "description" },
  ];
}

export default function EditEvent({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { initialValues, categories } = loaderData;
  const { id } = useParams();

  const handleSave = async (data: EditEventBody | undefined) => {
    if (!data) return;
    if (!id) return;
    try {
      const res = await api.eventos({ id }).patch(data);
      if (res.status !== 200 || !res.data) {
        throw new Error(
          // @ts-expect-error - error is not typed
          res.error?.value?.message ?? "Error al actualizar el evento",
        );
      }
      toast.success("Evento actualizado");
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Error al actualizar el evento. ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Editar Evento</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Actualizá los detalles de tu evento
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          {initialValues ? (
            <Suspense
              fallback={
                <EventForm
                  mode="edit"
                  initialValues={initialValues}
                  onSubmit={handleSave}
                  submitLabel="Guardar Cambios"
                  categories={[]}
                  loadingCategories
                />
              }
            >
              <Await resolve={categories}>
                {(cats) => (
                  <EventForm
                    mode="edit"
                    initialValues={initialValues}
                    onSubmit={handleSave}
                    submitLabel="Guardar Cambios"
                    categories={cats}
                  />
                )}
              </Await>
            </Suspense>
          ) : (
            <div className="text-center text-gray-600">Cargando...</div>
          )}
        </div>
      </section>
    </div>
  );
}
