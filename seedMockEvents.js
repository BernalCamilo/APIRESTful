require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./models'); // <-- Importa todo el objeto
const sequelize = db.sequelize;
const Event = db.Event;

async function seedEvents() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida ✅');

    const filePath = path.join(__dirname, 'data', 'mockEvents.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await Event.bulkCreate(data);
    console.log('Eventos mock insertados exitosamente ✅');
  } catch (error) {
    console.error('Error insertando eventos mock:', error);
  } finally {
    await sequelize.close();
  }
}

seedEvents();
