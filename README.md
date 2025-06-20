# Ticket API - Gestión de Reservas de Eventos

Esta API RESTful permite gestionar eventos y reservas de boletos, desarrollada con Node.js, Express y Sequelize, y desplegada en Heroku con base de datos PostgreSQL.

## URL de Producción

**Base URL:** https://ticket-api-backend-555ebd5c6b07.herokuapp.com/

---

## Endpoints

### Eventos

#### GET `/events`
Obtiene todos los eventos registrados.

#### POST `/events`
Crea un nuevo evento.

```json
{
  "name": "Nombre del evento",
  "description": "Descripción",
  "category": "Categoría",
  "date": "2025-12-31",
  "location": "Ubicación",
  "totalTickets": 100,
  "imageUrl": "https://imagen.com",
  "status": "activo"
}
```

#### PUT `/events/:id`
Actualiza los datos de un evento (excepto el número de boletos disponibles).

#### DELETE `/events/:id`
Elimina un evento por su ID.

---

### Reservas

#### GET `/reservations`
Lista todas las reservas existentes.

#### POST `/reservations`
Crea una nueva reserva y descuenta los boletos disponibles.

```json
{
  "userName": "Juan Pérez",
  "email": "juan@example.com",
  "eventId": 1,
  "quantity": 2
}
```

#### PUT `/reservations/:id`
Edita una reserva existente (no permite cambiar el evento).

#### DELETE `/reservations/:id`
Elimina una reserva por su ID y libera los boletos reservados.

---

## Datos Mock

- Los eventos iniciales fueron insertados desde `data/mockEvents.json` con un script de seed.

---

## Tecnologías

- Node.js
- Express
- PostgreSQL + Sequelize
- Docker
- Heroku

---

## Docker

Para desarrollo local:
```bash
docker-compose up --build
```

---

## Despliegue en Heroku

Pasos realizados:

1. `heroku create`
2. `heroku addons:create heroku-postgresql:essential-0`
3. `git push heroku main`
4. `heroku run npx sequelize-cli db:migrate`
5. `heroku run node seedMockEvents.js`

---

## Estructura del Proyecto

```
ticket-api/
│
├── models/             # Modelos Sequelize
├── routes/             # Rutas de eventos y reservas
├── migrations/         # Migraciones de BD
├── data/               # Eventos de prueba
├── seedMockEvents.js   # Script para insertar datos mock
├── app.js              # Archivo principal
├── Dockerfile
├── docker-compose.yml
└── README.md
```
