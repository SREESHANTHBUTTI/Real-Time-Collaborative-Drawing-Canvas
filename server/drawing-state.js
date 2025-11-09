class DrawingState {
  constructor() {
    this.history = [];
    this.redoStack = [];
  }

  addStroke(stroke) {
    this.history.push(stroke); // stroke has points array
    this.redoStack = [];
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
