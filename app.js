const express = require('express');
const app = express();
const eventRoutes = require('./routes/events'); 

app.use(express.json());

app.use('/events', eventRoutes); 

app.get('/', (req, res) => {
  res.send('API funcionando ✅');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
