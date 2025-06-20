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
