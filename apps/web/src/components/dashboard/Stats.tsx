import type { Treaty } from "@elysiajs/eden";
import type { api } from "@web/lib/fetch";
import { Card, CardContent } from "../ui/card";

export function Stats({
  stats,
}: {
  stats: Treaty.Data<typeof api.estadisticas.get>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent>
          <p className="font-bold text-2xl">{stats.resumen.eventosTotal}</p>
          <p className="text-muted-foreground text-sm">
            Total de eventos registrados
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="font-bold text-2xl">
            {stats.resumen.inscripcionesTotal}
          </p>
          <p className="text-muted-foreground text-sm">
            Total de inscripciones registradas
          </p>
          <p className="text-muted-foreground/70 text-xs">
            {stats.inscripciones.inscripcionesPorEvento} inscripciones por
            evento promedio
          </p>
          <p className="text-muted-foreground/70 text-xs">
            {stats.inscripciones.tasaCancelacion * 100}% de inscripciones
            canceladas
          </p>
          <p className="text-muted-foreground/70 text-xs">
            {stats.inscripciones.tasaConversionDesdeWaitlist * 100}% de
            inscripciones convertidas desde waitlist
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="font-bold text-2xl">{stats.resumen.usuariosTotal}</p>
          <p className="text-muted-foreground text-sm">
            Total de usuarios registrados
          </p>
          <p className="text-muted-foreground/70 text-xs">
            {stats.resumen.usuariosOrganizadores} usuarios organizadores
          </p>
          <p className="text-muted-foreground/70 text-xs">
            {stats.resumen.usuariosParticipantes} usuarios participantes
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
