# 🏗️ System Architecture

## 1️⃣ Overview
The Real-Time Collaborative Drawing Canvas enables multiple users to draw together on a shared HTML5 canvas.  
It uses **Socket.io** for real-time data streaming and a **Node.js server** to manage synchronization between clients.

---

## 2️⃣ Data Flow
1. A user begins drawing on the client canvas.
2. The browser captures the drawing coordinates (x, y), color, and brush size.
3. This data is serialized and sent to the server through WebSocket events.
4. The server rebroadcasts these events to all connected clients.
5. Each client receives the stroke data and renders it instantly on its own canvas.

---

## 3️⃣ WebSocket Message Structure

| Event Name | Direction | Description |
|-------------|------------|--------------|
| `draw` | client → server | Sends new stroke data |
| `draw` | server → clients | Broadcasts strokes to all users |
| `undo` | client → server | Requests undo operation |
| `clear` | client ↔ server | Clears canvas globally |
| `cursor` | client ↔ server | Updates user cursor positions |

---

## 4️⃣ Undo/Redo Strategy
- The server maintains a **drawing history stack** (list of strokes).  
- When a user triggers an undo, the server removes the latest stroke and replays all remaining strokes to all clients.  
- Redo uses a secondary stack that stores undone strokes.

---

## 5️⃣ Conflict Resolution
If two users draw at the same time:
- Both strokes are added sequentially to the shared state.
- The server timestamps each event to preserve order.
- The canvas state is rebuilt using the ordered stroke list.

---

## 6️⃣ Performance Optimizations
- Mouse events are throttled to prevent network flooding.
- The canvas only re-renders changed regions.
- Minimal data (coordinates, color, width) is sent per stroke.
- The server stores a single shared state for consistency.

---

## 7️⃣ Future Improvements
- Room-based drawing sessions (via `rooms.js`)
- Persistent storage of drawings (MongoDB or file system)
- User authentication and color tagging
- Redo feature for all users

---

**Result:** A fully synchronized, real-time collaborative drawing experience with efficient event handling and minimal latency.
