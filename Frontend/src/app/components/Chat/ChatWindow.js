'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow = ({ orderId, userId, recipientId, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket, connected, joinChatRoom, sendMessage, startTyping, stopTyping } = useSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (connected && orderId && userId) {
      joinChatRoom(orderId, userId);
      fetchMessages();
    }
  }, [connected, orderId, userId]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('chat-message', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for typing indicators
    socket.on('typing-start', ({ userId: typingUserId }) => {
      console.log('Typing started by:', typingUserId);
      if (typingUserId === recipientId) {
        setIsTyping(true);
      }
    });

    socket.on('typing-stop', ({ userId: typingUserId }) => {
      console.log('Typing stopped by:', typingUserId);
      if (typingUserId === recipientId) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('chat-message');
      socket.off('typing-start');
      socket.off('typing-stop');
    };
  }, [socket, recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/order/${orderId}`);
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    if (!connected) {
      console.log('Socket not connected, cannot send message');
      return;
    }
    
    try {
      if (!recipientId) {
        console.error('No recipient ID available');
        return;
      }

      // Add optimistic update
      const newMessage = {
        senderId: userId,
        recipientId: recipientId,
        message: content,
        timestamp: new Date(),
        _id: Date.now().toString(), // temporary ID
        orderId: orderId
      };
      console.log('Sending message:', newMessage);
      setMessages(prev => [...prev, newMessage]);

      // Send message through socket
      sendMessage(orderId, userId, recipientId, content);
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the optimistic update on error
      setMessages(prev => prev.filter(msg => msg._id !== newMessage._id));
    }
  };

  const handleTyping = (isTyping) => {
    if (isTyping) {
      startTyping(orderId, userId);
    } else {
      stopTyping(orderId, userId);
    }
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg shadow-lg">
      <div className="bg-green-500 text-white px-4 py-3 rounded-t-lg">
        <h2 className="font-semibold">{recipientName}</h2>
        {isTyping && (
          <div className="text-sm opacity-75">typing...</div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message.message}
            timestamp={message.timestamp}
            isSender={message.senderId === userId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <ChatInput 
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
};

export default ChatWindow;