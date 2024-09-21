import { initWebSocket } from '@/lib/websocket';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    initWebSocket(res); // Initialize WebSocket server
    console.log('WebSocket initialized');
  }

  res.end();
}
