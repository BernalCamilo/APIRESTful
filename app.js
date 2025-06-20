const express = require('express');
const app = express();
const eventRoutes = require('./routes/events'); 
const reservationRoutes = require('./routes/reservations');

app.use(express.json());

app.use('/reservations', reservationRoutes);
app.use('/events', eventRoutes); 

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
