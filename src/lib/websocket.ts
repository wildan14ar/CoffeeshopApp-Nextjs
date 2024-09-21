import { Server } from 'socket.io';

let io;

export function initWebSocket(res) {
  if (!io) {
    io = new Server(res.socket.server, {
      cors: {
        origin: process.env.APP_URL,
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    res.socket.server.io = io; // Attach the WebSocket to the server
  }

  return io;
}

export function sendOrderStatusUpdate(orderId, status) {
  if (io) {
    io.emit('orderStatusUpdate', { orderId, status });
  } else {
    console.error('WebSocket not initialized');
  }
}
