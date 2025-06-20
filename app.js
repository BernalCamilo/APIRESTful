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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

