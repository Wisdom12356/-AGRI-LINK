'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Create socket connection
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
            autoConnect: true,
            transports: ['websocket']
        });

        // Socket event handlers
        newSocket.on('connect', () => {
            console.log('Socket connected');
            setConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setConnected(false);
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            newSocket.close();
        };
    }, []);

    const joinChatRoom = (orderId, userId) => {
        if (socket && connected) {
            socket.emit('join-chat-room', { orderId, userId });
        }
    };

    const sendMessage = (orderId, senderId, recipientId, message) => {
        if (socket && connected) {
            socket.emit('chat-message', {
                orderId,
                senderId,
                recipientId,
                message,
                timestamp: new Date()
            });
        }
    };

    const startTyping = (orderId, userId) => {
        if (socket && connected) {
            socket.emit('typing-start', { orderId, userId });
        }
    };

    const stopTyping = (orderId, userId) => {
        if (socket && connected) {
            socket.emit('typing-stop', { orderId, userId });
        }
    };

    const value = {
        socket,
        connected,
        joinChatRoom,
        sendMessage,
        startTyping,
        stopTyping
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}