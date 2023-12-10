// Importar las dependencias necesarias
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Configurar la aplicación de Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Ruta para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// Evento de conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar el evento de recibir 'true' o 'false' del cliente
  socket.on('enviarBooleano', (data) => {
    console.log('Booleano recibido:', data);
    
    // Broadcast del booleano a todos los clientes conectados
    io.emit('booleano', data);
  });

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
