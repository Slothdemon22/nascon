'use client';

import { useState } from 'react';
import { useWebSocket } from '@/hooks/wsHook';

export default function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const { messages, sendMessage, isConnected } = useWebSocket(
    typeof window !== 'undefined' ? `ws://${window.location.host}/api/ws` : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      sendMessage({
        username,
        message
      });
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">WebSocket Chat</h1>
      
      <div className="mb-4">
        <div className={`inline-block px-2 py-1 rounded text-white text-sm ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="h-64 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${
            msg.type === 'system' 
              ? 'bg-gray-200 text-gray-700 italic' 
              : msg.username === username 
                ? 'bg-blue-100 ml-auto text-right' 
                : 'bg-gray-100'
          }`}>
            {msg.type === 'chat' && (
              <div className="font-bold">{msg.username}</div>
            )}
            <div>{msg.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!isConnected || !username.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}