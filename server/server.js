// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const DrawingState = require('./drawing-state');
const RoomManager = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve client files
app.use(express.static(path.join(__dirname, '../client')));

// Create drawing state and rooms
const drawingState = new DrawingState();
const roomManager = new RoomManager();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send current canvas history
  socket.emit('initCanvas', drawingState.getHistory());

  // Drawing event from client
  socket.on('draw', (data) => {
    drawingState.addStroke(data);
    socket.broadcast.emit('draw', data);
  });

  // Undo event
  socket.on('undo', () => {
    drawingState.undo();
    io.emit('clearCanvas');
    io.emit('initCanvas', drawingState.getHistory());
  });

  // Clear canvas
  socket.on('clear', () => {
    drawingState.clear();
    io.emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
