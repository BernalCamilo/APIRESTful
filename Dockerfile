# Imagen base de Node.js
FROM node:18

# Establece la carpeta de trabajo
WORKDIR /app

# Copia los archivos necesarios e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Comando para correr la app
CMD ["npx", "nodemon", "app.js"]

