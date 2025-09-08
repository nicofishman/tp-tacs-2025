
# Colección de Pruebas Postman - TP-TACS

Esta colección te permite validar todos los endpoints principales de la API TP-TACS, incluyendo casos de éxito y error para usuarios, eventos y categorías.

## ¿Cómo usar esta colección?

1. **Importa la colección**: Abre Postman y selecciona `Import > File`, luego elige el archivo `tp-tacs.json`.
2. **Configura las variables de entorno**:
	 - Ve a `Environments` y crea uno nuevo llamado `TP-TACS`.
	 - Asigna la variable `baseURL` (ejemplo: `http://localhost:3000`).
	 - Completa los IDs (`usuarioId`, `eventoId`, `categoriaId`, etc.) con valores válidos de tu base de datos.
3. **Ejecuta las pruebas**: Selecciona la carpeta o el request que quieras probar y haz click en `Send`.


-- **HealthCheck**: Verifica que la API y la base de datos estén funcionando.
-- **Usuario**: Prueba todos los casos de creación, consulta, actualización, reemplazo y eliminación, incluyendo errores de validación y duplicados.
-- **Evento**: Prueba la creación, consulta, actualización, reemplazo y eliminación de eventos, validando relaciones y errores típicos (categoría/organizador inexistente, datos inválidos, etc.).
-- **Categoría**: Prueba la creación, consulta y eliminación de categorías, incluyendo errores de nombre vacío o repetido.
-- **Inscripción**: Prueba el flujo completo de inscripciones, incluyendo:
	- Creación exitosa y con errores (usuario/evento inexistente, estado inválido, campos faltantes)
	- Consulta de inscripciones (listar y buscar por ID, incluyendo ID inválido)
	- Actualización de estado (solo se permite modificar el estado, prueba éxito, estado inválido y body vacío)
	- Eliminación de inscripción (éxito e ID inválido)

## Ejemplos de pruebas y resultados esperados

### HealthCheck
- **GET /health**
	- Esperado: 200 OK
	- Respuesta ejemplo:
		```json
		{
			"status": "ok",
			"database": "connected"
		}
		```

### Usuarios
- **Crear usuario - éxito**
	```json
	{ "nombre": "Juan Pérez", "email": "juan.perez@example.com", "rol": "ADMIN" }
	```
	- Esperado: 201 Created, usuario creado correctamente.
- **Crear usuario - email inválido**
	```json
	{ "nombre": "Ana", "email": "no-es-un-email", "rol": "USER" }
	```
	- Esperado: 400 Bad Request, error de validación "Email inválido".
- **Crear usuario - rol inválido**
	```json
	{ "nombre": "Pedro", "email": "pedro@example.com", "rol": "NOEXISTE" }
	```
	- Esperado: 400 Bad Request, error de validación "Rol inválido".
- **Crear usuario - email repetido**
	```json
	{ "nombre": "Juan Pérez", "email": "juan.perez@example.com", "rol": "ADMIN" }
	```
	- Esperado: 409 Conflict, "El email ya está registrado".
- **Crear usuario - nombre vacío**
	```json
	{ "nombre": "", "email": "vacio@example.com", "rol": "USER" }
	```
	- Esperado: 400 Bad Request, error de validación "El nombre no puede estar vacío".
- **Crear usuario - sin nombre**
	```json
	{ "email": "sin.nombre@example.com", "rol": "USER" }
	```
	- Esperado: 400 Bad Request, error de validación "El nombre es requerido".

### Inscripciones
- **Crear inscripción - éxito**
	```json
	{ "usuarioId": "{{usuarioId}}", "eventoId": "{{eventoId}}", "estado": "CONFIRMADO" }
	```
	- Esperado: 201 Created, inscripción creada correctamente.
- **Crear inscripción - usuario inexistente**
	```json
	{ "usuarioId": "{{usuarioIdInvalido}}", "eventoId": "{{eventoId}}", "estado": "CONFIRMADO" }
	```
	- Esperado: 404 Not Found, "Usuario no encontrado".
- **Crear inscripción - evento inexistente**
	```json
	{ "usuarioId": "{{usuarioId}}", "eventoId": "{{eventoIdInvalido}}", "estado": "CONFIRMADO" }
	```
	- Esperado: 404 Not Found, "Evento no encontrado".
- **Crear inscripción - estado inválido**
	```json
	{ "usuarioId": "{{usuarioId}}", "eventoId": "{{eventoId}}", "estado": "NOEXISTE" }
	```
	- Esperado: 400 Bad Request, error de validación "Estado inválido".
- **Crear inscripción - falta usuarioId**
	```json
	{ "eventoId": "{{eventoId}}", "estado": "CONFIRMADO" }
	```
	- Esperado: 400 Bad Request, error de validación "El ID de usuario es requerido".
- **Crear inscripción - falta eventoId**
	```json
	{ "usuarioId": "{{usuarioId}}", "estado": "CONFIRMADO" }
	```
	- Esperado: 400 Bad Request, error de validación "El ID de evento es requerido".
- **Crear inscripción - falta estado**
	```json
	{ "usuarioId": "{{usuarioId}}", "eventoId": "{{eventoId}}" }
	```
	- Esperado: 400 Bad Request, error de validación "Estado inválido".

- **Listar inscripciones**
	- GET `/inscripciones`
	- Esperado: 200 OK, array de inscripciones.
- **Obtener inscripción por ID - éxito**
	- GET `/inscripciones/{{inscripcionId}}`
	- Esperado: 200 OK, inscripción encontrada.
- **Obtener inscripción por ID - ID inválido**
	- GET `/inscripciones/{{inscripcionIdInvalido}}`
	- Esperado: 400 Bad Request, error de validación.

- **Actualizar inscripción - éxito**
	```json
	{ "estado": "WAITLIST" }
	```
	- PATCH `/inscripciones/{{inscripcionId}}`
	- Esperado: 200 OK, inscripción actualizada.
- **Actualizar inscripción - estado inválido**
	```json
	{ "estado": "NOEXISTE" }
	```
	- PATCH `/inscripciones/{{inscripcionId}}`
	- Esperado: 400 Bad Request, error de validación "Estado inválido".
- **Actualizar inscripción - body vacío**
	```json
	{}
	```
	- PATCH `/inscripciones/{{inscripcionId}}`
	- Esperado: 400 Bad Request, "Solo se puede modificar el estado de la inscripción".

- **Eliminar inscripción - éxito**
	- DELETE `/inscripciones/{{inscripcionId}}`
	- Esperado: 204 No Content, inscripción eliminada.
- **Eliminar inscripción - ID inválido**
	- DELETE `/inscripciones/{{inscripcionIdInvalido}}`
	- Esperado: 400 Bad Request, error de validación.

### Categorías
- **Crear categoría - éxito**
	```json
	{ "nombre": "Conferencia" }
	```
	- Esperado: 201 Created, categoría creada.
- **Crear categoría - nombre vacío**
	```json
	{ "nombre": "" }
	```
	- Esperado: 400 Bad Request, error de validación "El nombre no puede estar vacío".
- **Crear categoría - sin nombre**
	```json
	{}
	```
	- Esperado: 400 Bad Request, error de validación "El nombre es requerido".
- **Crear categoría - nombre repetido**
	```json
	{ "nombre": "Conferencia" }
	```
	- Esperado: 409 Conflict, "El nombre ya está registrado".

... (más ejemplos para GET, DELETE, ver colección)

### Eventos
- **Crear evento - éxito**
	```json
	{
		"titulo": "Seminario de Cloud Computing",
		"descripcion": "Todo sobre servicios en la nube",
		"fechaInicio": "2025-09-25T09:00:00Z",
		"duracion": { "horas": 4, "minutos": 0 },
		"ubicacion": { "direccion": "Av. Las Heras 2500", "lat": -34.5895, "lng": -58.3973 },
		"cupoMaximo": 200,
		"precio": 1500,
		"categoriaId": "{{categoriaId}}",
		"estado": "ACTIVO",
		"organizadorId": "{{usuarioId}}"
	}
	```
	- Esperado: 201 Created, evento creado correctamente.
- **Crear evento - datos inválidos**
	```json
	{
		"titulo": "",
		"descripcion": "",
		"fechaInicio": "fecha-invalida",
		"duracion": { "horas": -1, "minutos": 70 },
		"ubicacion": { "direccion": "", "lat": "no-numero", "lng": null },
		"cupoMaximo": 0,
		"precio": -100,
		"categoriaId": "",
		"estado": "NO_EXISTE",
		"organizadorId": ""
	}
	```
	- Esperado: 400 Bad Request, mensajes de error de validación.
- **Crear evento - categoría inválida**
	- Esperado: 404 Not Found, "Categoría no encontrada".
- **Crear evento - organizador inválido**
	- Esperado: 404 Not Found, "Organizador no encontrado".

... (más ejemplos para GET, PUT, PATCH, DELETE, ver colección)

## Consejos y debugging

- Si una prueba falla, revisa el body, los headers y las variables de entorno.
- Usa la consola de Postman para ver los detalles de la respuesta y los errores.
- Puedes duplicar y modificar los requests para probar casos personalizados.
- Si la API devuelve un error inesperado, revisa los logs del backend y la base de datos.

## Automatización

- Puedes usar la función `Runner` de Postman para ejecutar todas las pruebas de una carpeta automáticamente.
- Agrega scripts de test en Postman para validar el status y el contenido de la respuesta.

## Personalización

- La colección es extensible: agrega tus propios casos, variables y scripts según lo que necesites validar.

---
