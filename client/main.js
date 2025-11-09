const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');
const undoBtn = document.getElementById('undoBtn');
const clearBtn = document.getElementById('clearBtn');

colorPicker.addEventListener('change', (e) => brushColor = e.target.value);
brushSizeInput.addEventListener('input', (e) => brushSize = e.target.value);

undoBtn.addEventListener('click', () => socket.emit('undo'));
clearBtn.addEventListener('click', () => socket.emit('clear'));
