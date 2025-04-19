import { WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';

// This variable will hold our WebSocket server instance
let wss;

export async function GET(request) {
  if (!wss) {
    // Create WebSocket server
    wss = new WebSocketServer({ noServer: true });
    
    // Store connected clients
    const clients = new Set();

    wss.on('connection', (ws) => {
      console.log('New client connected');
      clients.add(ws);

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'system',
        message: 'Welcome to the chat!',
        timestamp: new Date().toISOString()
      }));

      // Notify others about new connection
      broadcast({
        type: 'system',
        message: 'A new user has joined the chat',
        timestamp: new Date().toISOString()
      }, ws);

      // Handle messages
      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        const data = JSON.parse(message);
        broadcast({
          type: 'chat',
          username: data.username || 'Anonymous',
          message: data.message,
          timestamp: new Date().toISOString()
        }, ws);
      });

      // Handle disconnection
      ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
        broadcast({
          type: 'system',
          message: 'A user has left the chat',
          timestamp: new Date().toISOString()
        });
      });

      function broadcast(data, sender) {
        const message = JSON.stringify(data);
        clients.forEach((client) => {
          if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  }

  // Handle WebSocket upgrade
  const { searchParams } = new URL(request.url);
  if (searchParams.get('_ws')) {
    if (wss) {
      const response = NextResponse.next();
      response.socket.server = wss;
      return response;
    }
  }

  return new NextResponse('WebSocket endpoint', { status: 200 });
}