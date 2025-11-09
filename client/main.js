const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const clearBtn = document.getElementById('clearBtn');

// Set brush color
colorPicker.addEventListener('change', (e) => brushColor = e.target.value);

// Set brush size
brushSizeInput.addEventListener('input', (e) => brushSize = e.target.value);

// Undo / Redo
undoBtn.addEventListener('click', () => socket.emit('undo'));
redoBtn.addEventListener('click', () => socket.emit('redo'));

// Clear canvas
clearBtn.addEventListener('click', () => socket.emit('clear'));
