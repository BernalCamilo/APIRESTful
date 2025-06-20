const express = require('express');
const router = express.Router();
const { Reservation, Event } = require('../models');

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

module.exports = router;
