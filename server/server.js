const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const DrawingState = require('./drawing-state');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from client folder
app.use(express.static(__dirname + '/../client'));

// Create a DrawingState instance
const drawingState = new DrawingState();

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Send current canvas history to new user
  socket.emit('initCanvas', drawingState.getHistory());

  // When a user draws
  socket.on('draw', (stroke) => {
    drawingState.addStroke(stroke);
    // Broadcast the stroke to all other users
    socket.broadcast.emit('draw', stroke);
  });

  // Handle undo
  socket.on('undo', () => {
    const undone = drawingState.undo();
    if (undone) {
      // Send updated history to all clients
      io.emit('initCanvas', drawingState.getHistory());
    }
  });

  // Handle redo
  socket.on('redo', () => {
    const redone = drawingState.redo();
    if (redone) {
      io.emit('initCanvas', drawingState.getHistory());
    }
  });

  // Handle clear canvas
  socket.on('clear', () => {
    drawingState.clear();
    io.emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
