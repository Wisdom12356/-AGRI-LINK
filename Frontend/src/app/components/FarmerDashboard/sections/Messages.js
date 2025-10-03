'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // TODO: Fetch actual chats from the backend
    const mockChats = [
      {
        id: 1,
        customerName: 'John Doe',
        lastMessage: 'I\'m interested in your tomatoes',
        timestamp: '2025-09-22T10:30:00',
        unread: true,
        avatar: '/images/man1.jpg'
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        lastMessage: 'When will the corn be available?',
        timestamp: '2025-09-22T09:15:00',
        unread: true,
        avatar: '/images/man2.jpg'
      }
    ];
    setChats(mockChats);
  }, []);

  const handleSendMessage = (content) => {
    if (!content.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      content,
      senderId: 'farmer', // Replace with actual farmer ID
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-12rem)]">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                activeChat?.id === chat.id ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={chat.avatar}
                  alt={chat.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{chat.customerName}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  {chat.unread && (
                    <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full mt-1">
                      New
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeChat ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.customerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{activeChat.customerName}</h3>
                  <span className="text-sm text-gray-500">Customer</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'farmer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.senderId === 'farmer'
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.message.value;
                  handleSendMessage(message);
                  e.target.reset();
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}