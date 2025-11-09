// rooms.js
// Handles multiple collaborative drawing rooms and user connections.

const DrawingState = require("./drawing-state");

class RoomManager {
  constructor() {
    this.rooms = {}; // { roomId: { users: Set(), state: DrawingState } }
  }

  createRoom(roomId) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        users: new Set(),
        state: new DrawingState(),
      };
    }
  }

  joinRoom(roomId, socketId) {
    this.createRoom(roomId);
    this.rooms[roomId].users.add(socketId);
  }

  leaveRoom(roomId, socketId) {
    if (this.rooms[roomId]) {
      this.rooms[roomId].users.delete(socketId);
      if (this.rooms[roomId].users.size === 0) delete this.rooms[roomId];
    }
  }

  getRoomState(roomId) {
    return this.rooms[roomId]?.state || null;
  }
}

module.exports = RoomManager;
