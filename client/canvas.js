const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

let drawing = false;
let brushColor = '#000000';
let brushSize = 3;

const startDraw = (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const draw = (e) => {
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  sendDrawEvent({ x: e.offsetX, y: e.offsetY, color: brushColor, size: brushSize });
};

const stopDraw = () => {
  drawing = false;
  ctx.closePath();
};

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);
