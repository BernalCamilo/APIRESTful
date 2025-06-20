require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { Event } = require('./models');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

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
