const socket = io();

function sendDrawEvent(stroke) {
  socket.emit('draw', stroke);
}

// When receiving a stroke from server
socket.on('draw', (stroke) => {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

  for (let i = 1; i < stroke.points.length; i++) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    ctx.stroke();
  }

  ctx.closePath();
});

// Initialize canvas with history
socket.on('initCanvas', (history) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach((stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      ctx.stroke();
    }
    ctx.closePath();
  });
});

// Clear canvas event
socket.on('clearCanvas', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
