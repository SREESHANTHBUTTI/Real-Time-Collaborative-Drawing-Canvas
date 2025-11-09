const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

let drawing = false;
let brushColor = '#000000';
let brushSize = 3;
let currentStroke = []; // store all points in this stroke

const startDraw = (e) => {
  drawing = true;
  currentStroke = [{ x: e.offsetX, y: e.offsetY }];
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

  currentStroke.push({ x: e.offsetX, y: e.offsetY });
};

const stopDraw = () => {
  if (!drawing) return;
  drawing = false;
  ctx.closePath();

  // Send the full stroke to server
  sendDrawEvent({ points: currentStroke, color: brushColor, size: brushSize });
  currentStroke = [];
};

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);
