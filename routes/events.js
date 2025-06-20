const express = require('express');
const router = express.Router();
const { Event } = require('../models');

// GET /events - obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /events - crear evento
router.post('/', async (req, res) => {
  try {
    const nuevoEvento = await Event.create(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(400).json({ error: 'Error al guardar el evento' });
  }
});

module.exports = router;
// PUT /events/:id - actualizar un evento existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Event.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await evento.update(req.body);
    res.json(evento);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(400).json({ error: 'Error al actualizar el evento' });
  }
});