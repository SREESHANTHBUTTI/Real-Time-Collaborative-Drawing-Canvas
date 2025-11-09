// drawing-state.js
// Manages the shared drawing history and state for all users.

class DrawingState {
  constructor() {
    this.history = [];   // stores all strokes
    this.redoStack = []; // stores undone strokes
  }

  addStroke(stroke) {
    this.history.push(stroke);
    this.redoStack = []; // clear redo history whenever new stroke is added
  }

  undo() {
    if (this.history.length > 0) {
      const lastStroke = this.history.pop();
      this.redoStack.push(lastStroke);
      return true;
    }
    return false;
  }

  redo() {
    if (this.redoStack.length > 0) {
      const stroke = this.redoStack.pop();
      this.history.push(stroke);
      return stroke;
    }
    return null;
  }

  clear() {
    this.history = [];
    this.redoStack = [];
  }

  getHistory() {
    return this.history;
  }
}

module.exports = DrawingState;
