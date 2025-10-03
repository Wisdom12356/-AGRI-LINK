'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [farmerId, setFarmerId] = useState(null);
  const [user, setUser] = useState(null);
  const { socket } = useSocket();

  // Get farmer ID from token and authenticate with socket
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (payload.exp < currentTime) {
          console.log('Token expired in Messages component');
          // Clear invalid token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          window.location.href = '/login';
          return;
        }
        
        setFarmerId(payload.user._id);
        setUser(JSON.parse(userData));
        
        // Authenticate with socket
        if (socket && payload.user._id) {
          socket.emit('authenticate', payload.user._id);
          console.log('Farmer authenticated with socket:', payload.user._id);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // If token is invalid, clear it and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    } else {
      // No token found, redirect to login
      window.location.href = '/login';
    }
  }, [socket]);

  // Fetch farmer's orders to get chat conversations
  useEffect(() => {
    const fetchFarmerChats = async () => {
      if (!farmerId) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log('Fetching farmer orders with token:', token ? 'Token exists' : 'No token');
        console.log('Farmer ID:', farmerId);
        
        // First, let's test if the farmer can access their profile to verify authentication
        const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/farmers/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Profile response status:', profileResponse.status);
        
        if (!profileResponse.ok) {
          console.error('Farmer not authenticated. Profile response:', profileResponse.status);
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/farmer/${farmerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Orders response status:', response.status);

        if (response.ok) {
          const responseData = await response.json();
          console.log('Farmer orders fetched:', responseData);
          console.log('Number of orders:', responseData.count);
          
          // Extract the orders array from the response
          const orders = responseData.orders || [];
          console.log('Orders array:', orders);
          
          // Transform orders into chat conversations
          const chatConversations = orders.map(order => ({
            id: order._id,
            orderId: order._id,
            customerName: order.userId?.name || 'Customer',
            customerId: order.userId?._id,
            productName: order.productId?.name || 'Product',
            lastMessage: 'Click to view conversation',
            timestamp: order.createdAt,
            unread: false, // TODO: Implement unread message tracking
            avatar: '/images/man1.jpg' // Default avatar
          }));

          console.log('Chat conversations created:', chatConversations);
          setChats(chatConversations);
        } else {
          console.error('Failed to fetch farmer orders. Status:', response.status);
          if (response.status === 401) {
            console.error('Farmer not authenticated. Please log in again.');
            // Optionally redirect to login
            // window.location.href = '/login';
          }
        }
      } catch (error) {
        console.error('Error fetching farmer chats:', error);
        if (error.message.includes('401')) {
          console.error('Authentication error. Please log in again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerChats();
  }, [farmerId]);

  // Fetch messages for a specific order
  const fetchMessages = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const fetchedMessages = await response.json();
        console.log('Messages fetched for order:', orderId, fetchedMessages);
        console.log('Number of messages:', fetchedMessages.length);
        setMessages(fetchedMessages);
      } else {
        console.error('Failed to fetch messages. Status:', response.status);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  // Handle chat selection
  const handleChatSelect = (chat) => {
    console.log('Chat selected:', chat);
    setActiveChat(chat);
    fetchMessages(chat.orderId);
    
    // Join the chat room for real-time updates
    if (socket && farmerId) {
      console.log('Joining chat room:', chat.orderId, 'for farmer:', farmerId);
      socket.emit('join-chat-room', { 
        orderId: chat.orderId, 
        userId: farmerId 
      });
    }
  };

  const handleSendMessage = (content) => {
    if (!content.trim() || !activeChat || !farmerId) return;

    const messageData = {
      orderId: activeChat.orderId,
      senderId: farmerId,
      recipientId: activeChat.customerId,
      message: content,
      timestamp: new Date().toISOString()
    };

    // Send message via socket
    if (socket) {
      socket.emit('chat-message', messageData);
    }

    // Optimistically add message to local state
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const newMessage = {
      _id: tempId,
      orderId: activeChat.orderId,
      senderId: farmerId,
      message: content,
      timestamp: new Date().toISOString(),
      isOptimistic: true // Mark as optimistic for easier identification
    };

    setMessages(prev => [...prev, newMessage]);
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (messageData) => {
      console.log('Farmer received message:', messageData);
      
      // Only add message if it's for the currently active chat
      if (activeChat && messageData.orderId === activeChat.orderId) {
        setMessages(prev => {
          // Check if message already exists to avoid duplicates
          const exists = prev.some(msg => 
            msg._id === messageData._id || 
            (msg.timestamp === messageData.timestamp && 
             msg.message === messageData.message && 
             msg.senderId === messageData.senderId)
          );
          
          if (exists) {
            console.log('Duplicate message detected, skipping');
            return prev;
          }
          
          // If this is a real message from server, replace any optimistic message with same content
          const filteredMessages = prev.filter(msg => 
            !(msg.isOptimistic && 
              msg.message === messageData.message && 
              msg.senderId === messageData.senderId &&
              Math.abs(new Date(msg.timestamp) - new Date(messageData.timestamp)) < 5000) // Within 5 seconds
          );
          
          console.log('Adding new message to chat');
          return [...filteredMessages, messageData];
        });
      }
    };

    socket.on('chat-message', handleIncomingMessage);

    return () => {
      socket.off('chat-message', handleIncomingMessage);
    };
  }, [socket, activeChat]);

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
          {!farmerId ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Please log in to view messages</div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading conversations...</div>
            </div>
          ) : chats.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">No conversations yet</div>
            </div>
          ) : (
            chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
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
                    <p className="text-sm text-gray-500 truncate">{chat.productName}</p>
                    <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                    {chat.unread && (
                      <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full mt-1">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
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
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center text-gray-500">
                    <p className="text-sm">No messages yet</p>
                    <p className="text-xs mt-1">Start the conversation!</p>
                  </div>
                </div>
              ) : (
                messages.map(message => {
                  const isFarmer = message.senderId === farmerId;
                  return (
                    <div
                      key={message._id || message.id}
                      className={`flex ${isFarmer ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[75%] ${isFarmer ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        {!isFarmer && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={activeChat.avatar}
                              alt={activeChat.customerName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Message bubble */}
                        <div
                          className={`relative rounded-2xl px-4 py-3 shadow-sm ${
                            isFarmer
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                        >
                          {/* Message content */}
                          <p className="text-sm leading-relaxed">{message.message || message.content}</p>
                          
                          {/* Timestamp */}
                          <div className={`flex items-center mt-2 ${isFarmer ? 'justify-end' : 'justify-start'}`}>
                            <span className={`text-xs ${
                              isFarmer ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          {/* Message tail */}
                          <div
                            className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
                              isFarmer
                                ? 'right-0 bg-green-500 -mr-1.5'
                                : 'left-0 bg-white border-l border-b border-gray-200 -ml-1.5'
                            }`}
                          ></div>
                        </div>
                        
                        {/* Farmer avatar */}
                        {isFarmer && (
                          <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {user?.name?.charAt(0)?.toUpperCase() || 'F'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.message.value;
                  if (message.trim()) {
                    handleSendMessage(message);
                    e.target.reset();
                  }
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