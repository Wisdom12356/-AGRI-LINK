'use client';

import { useState } from 'react';
import { User, X, Send } from 'lucide-react';

export default function ChatModal({ isOpen, onClose, currentChat, messages = [], onSendMessage, orderId, farmerId }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-xl shadow-2xl flex flex-col relative">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-green-600 to-green-500 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Chat with Farmer</h3>
                <p className="text-green-100 text-sm">
                  Order #{orderId || 'N/A'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          <div className="flex justify-center">
            <span className="bg-gray-100 text-gray-600 rounded-full px-4 py-2 text-xs">
              Today
            </span>
          </div>
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end space-x-2">
                {message.senderId !== 'client' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div
                  className={`max-w-[320px] rounded-2xl px-4 py-2 ${
                    message.senderId === 'client'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.senderId === 'client' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {message.senderId === 'client' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}