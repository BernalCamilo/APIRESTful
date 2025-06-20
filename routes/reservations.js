const express = require('express');
const router = express.Router();
const { Reservation, Event } = require('../models');
const { Op } = require('sequelize');

// POST /reservations - crear reserva
router.post('/', async (req, res) => {
  try {
    const { userName, email, quantity, eventId } = req.body;

    // Validar existencia del evento
    const evento = await Event.findByPk(eventId);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });

    // Validar disponibilidad de boletos
    const totalReservado = await Reservation.sum('quantity', {
      where: { eventId }
    });

    const boletosDisponibles = evento.totalTickets - (totalReservado || 0);
    if (quantity > boletosDisponibles) {
      return res.status(400).json({ error: 'No hay suficientes boletos disponibles' });
    }

    // Crear reserva
    const reserva = await Reservation.create({ userName, email, quantity, eventId });
    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al crear la reserva' });
  }
});

// GET /reservations - todas las reservas o filtradas por email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const where = email ? { email } : {};

    const reservas = await Reservation.findAll({ where });

    if (reservas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas' });
    }

    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error interno al obtener reservas' });
  }
});


// PUT /reservations/:id - editar una reserva (sin cambiar el evento)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, quantity } = req.body;

    const reserva = await Reservation.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const evento = await Event.findByPk(reserva.eventId);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Verificar disponibilidad excluyendo la reserva actual
    const totalReservado = await Reservation.sum('quantity', {
      where: {
        eventId: reserva.eventId,
        id: { [require('sequelize').Op.not]: reserva.id }
      }
    });

    const disponibles = evento.totalTickets - (totalReservado || 0);

    if (quantity > disponibles) {
      return res.status(400).json({ error: 'No hay suficientes boletos disponibles' });
    }

    // Actualizar los campos permitidos
    await reserva.update({
      userName,
      email,
      quantity
    });

    res.json(reserva);
  } catch (error) {
    console.error('Error al editar reserva:', error);
    res.status(500).json({ error: 'Error interno al editar la reserva' });
  }
});

module.exports = router;
