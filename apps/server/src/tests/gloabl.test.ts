// apps/server/src/tests/gloabl.test.ts

import { describe, expect, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { app } from "@server/index";

const api = treaty(app);

// ---------- ✅ helper para sufijos únicos por corrida ----------
const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

// Usamos un único sufijo para que todo el suite comparta los mismos datos
const SUFFIX = uid();

// Emails y categoría únicos
const EMAIL_NICOLAS = `nicolas+${SUFFIX}@example.com`;
const EMAIL_RAMIRO = `ramiro+${SUFFIX}@example.com`;
const EMAIL_EITAN = `eitan+${SUFFIX}@example.com`;
const EMAIL_ALAN = `alan+${SUFFIX}@example.com`;
const CATEGORIA_NOMBRE = `Conferencia de Tecnología ${SUFFIX}`;
const CATEGORIA_NOMBRE_2 = `Workshop de Tecnología ${SUFFIX}`;
const CATEGORIA_NOMBRE_3 = `Seminario de Tecnología ${SUFFIX}`;

// ---------- tests ----------
describe("Health Check Tests", () => {
  it("HealthCheck correcto", async () => {
    const response = await api.health.get();
    expect(response.status).toBe(200);
  });
});

describe("Create Users Tests", () => {
  it("Register a user and retrieve their information", async () => {
    const response = await api.usuarios.post({
      email: EMAIL_NICOLAS,
      nombre: "Nicolas Fisshman",
      password: "securepassword",
      rol: "ADMIN",
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id");
    if (!response.data) {
      throw new Error("User registration failed: response.data is null");
    }

    const responseGet = await api
      .usuarios({ id: (response.data as any).id })
      .get();
    expect(responseGet.status).toBe(200);
    expect(responseGet.data).toHaveProperty("nombre", "Nicolas Fisshman");
    expect(responseGet.data).toHaveProperty("email", EMAIL_NICOLAS);
  });

  it("Get users list", async () => {
    const response = await api.usuarios.get();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data?.length).toBeGreaterThan(0);
  });
});

describe("Create category tests", () => {
  it("Create a category and retrieve their information", async () => {
    const response = await api.categorias.post({
      nombre: CATEGORIA_NOMBRE,
    });
    expect(response.status).toBe(201);

    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("nombre", CATEGORIA_NOMBRE);

    if (!response.data) {
      throw new Error("Category creation failed: response.data is null");
    }
    const responseGet = await api
      .categorias({ id: (response.data as any).id })
      .get();
    expect(responseGet.status).toBe(200);
    expect(responseGet.data).toHaveProperty("nombre", CATEGORIA_NOMBRE);
  });

  it("Get categories list", async () => {
    const response = await api.categorias.get();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data?.length).toBeGreaterThan(0);
  });
});

describe("Events API", () => {
  it("Create an event", async () => {
    const userResponse = await api.usuarios.post({
      email: EMAIL_RAMIRO,
      nombre: "Ramiro Remersaro",
      password: "supersecurepassword",
      rol: "ORGANIZADOR",
    });
    if (!userResponse.data) {
      throw new Error("User registration failed: userResponse.data is null");
    }
    const idOrganizador = (userResponse.data as any).id;

    const categoriaResponse = await api.categorias.post({
      nombre: CATEGORIA_NOMBRE_2,
    });
    if (!categoriaResponse.data) {
      throw new Error(
        "Category creation failed: categoriaResponse.data is null",
      );
    }
    const idCategoria = (categoriaResponse.data as any).id;

    const eventoResponse = await api.eventos.post({
      categoriaId: idCategoria,
      cupoMaximo: 300,
      cupoMinimo: 50,
      descripcion: "An exciting tech conference.",
      duracion: { horas: 8, minutos: 0 },
      estado: "PENDIENTE",
      fechaInicio: new Date().toISOString(),
      organizadorId: idOrganizador,
      precio: 199.99,
      titulo: "Tech Conference 2025",
      ubicacion: {
        direccion: "123 Tech St, Silicon Valley, CA",
        lat: 37.7749,
        lng: -122.4194,
      },
    });

    expect(eventoResponse.status).toBe(201);
    expect(eventoResponse.data).toHaveProperty("id");
    expect(eventoResponse.data).toHaveProperty(
      "titulo",
      "Tech Conference 2025",
    );
    expect(eventoResponse.data).toHaveProperty(
      "descripcion",
      "An exciting tech conference.",
    );
  });
});

describe("Inscriptions API", () => {
  it("Register to event", async () => {
    // Crear usuario y evento para la inscripción
    const userResponse = await api.usuarios.post({
      email: EMAIL_EITAN,
      nombre: "Eitan Fiszer",
      password: "inscripcion123",
      rol: "ORGANIZADOR",
    });
    if (!userResponse.data) {
      throw new Error("User registration failed: userResponse.data is null");
    }
    const idUsuario = (userResponse.data as any).id;

    const categoriaResponse = await api.categorias.post({
      nombre: CATEGORIA_NOMBRE_3,
    });
    if (!categoriaResponse.data) {
      throw new Error(
        "Category creation failed: categoriaResponse.data is null",
      );
    }
    const idCategoria = (categoriaResponse.data as any).id;

    const eventoResponse = await api.eventos.post({
      categoriaId: idCategoria,
      cupoMaximo: 100,
      cupoMinimo: 10,
      descripcion: "Evento para inscripciones.",
      duracion: { horas: 2, minutos: 0 },
      estado: "PENDIENTE",
      fechaInicio: new Date().toISOString(),
      organizadorId: idUsuario,
      precio: 50,
      titulo: "Evento Inscripcion",
      ubicacion: {
        direccion: "Calle Inscripcion 123",
        lat: 40.7128,
        lng: -74.006,
      },
    });
    if (!eventoResponse.data) {
      throw new Error("Event creation failed: eventoResponse.data is null");
    }
    const idEvento = (eventoResponse.data as any).id;

    // Crear la inscripción

    const userInscripcionResponse = await api.usuarios.post({
      email: EMAIL_ALAN,
      nombre: "Alan Turing",
      password: "alan123",
      rol: "PARTICIPANTE",
    });
    if (!userInscripcionResponse.data) {
      throw new Error("User registration failed: userResponse.data is null");
    }

    const eventoInscripcionResponse = await api
      .eventos({ id: idEvento })
      .register.post(
        {},
        { query: { user_id: (userInscripcionResponse.data as any).id } },
      );

    expect(eventoInscripcionResponse.status).toBe(200);

    const participantsResponse = await api
      .eventos({ id: idEvento })
      .participants.get();

    expect(participantsResponse.status).toBe(200);
    if (!participantsResponse.data) {
      throw new Error("Participants response data is null");
    }
    expect(participantsResponse.data.participantes?.[0]).toHaveProperty(
      "id",
      (userInscripcionResponse.data as any).id,
    );
  });
});
