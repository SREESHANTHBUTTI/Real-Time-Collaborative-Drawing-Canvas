const socket = io();

function sendDrawEvent(data) {
  socket.emit('draw', data);
}

// Receive drawing from other users
socket.on('draw', (data) => {
  ctx.strokeStyle = data.color;
  ctx.lineWidth = data.size;
  ctx.lineCap = 'round';
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
});

// Initialize canvas with history
socket.on('initCanvas', (history) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach((d) => {
    ctx.strokeStyle = d.color;
    ctx.lineWidth = d.size;
    ctx.lineCap = 'round';
    ctx.lineTo(d.x, d.y);
    ctx.stroke();
  });
});

// Clear canvas
socket.on('clearCanvas', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
