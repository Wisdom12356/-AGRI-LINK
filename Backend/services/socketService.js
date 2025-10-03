const Message = require('../models/Message');

class SocketService {
    constructor(io) {
        this.io = io;
        this.connectedUsers = new Map();
        this.chatRooms = new Map(); // Store active chat rooms
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            // Handle user authentication
            socket.on('authenticate', (userId) => {
                this.connectedUsers.set(userId, socket.id);
                console.log(`User ${userId} authenticated with socket ${socket.id}`);
            });

            // Handle joining chat rooms
            socket.on('join-chat-room', ({ orderId, userId }) => {
                const roomId = `order-chat-${orderId}`;
                socket.join(roomId);
                console.log(`User ${userId} joined chat room for order ${orderId}`);
                
                // Log chat room info
                const roomInfo = this.chatRooms.get(roomId);
                console.log('Debug - Chat Room Info:', {
                    roomId,
                    roomInfo,
                    allRooms: Array.from(this.chatRooms.entries())
                });
            });

            // Handle chat messages
            socket.on('chat-message', async ({ orderId, senderId, recipientId, message, timestamp }) => {
                console.log('Debug - Received chat message:', { 
                    orderId, 
                    senderId, 
                    recipientId, 
                    message, 
                    timestamp,
                    roomId: `order-chat-${orderId}`,
                    roomExists: this.chatRooms.has(`order-chat-${orderId}`),
                    connectedUsers: Array.from(this.connectedUsers.entries())
                });
                try {
                    // Save message to database
                    const newMessage = new Message({
                        orderId,
                        senderId,
                        recipientId,
                        content: message, // Map 'message' to 'content' as required by the model
                        timestamp: timestamp || new Date()
                    });
                    await newMessage.save();
                    console.log('Message saved to database:', newMessage);

                    // Broadcast message to room
                    const messageToSend = {
                        orderId,
                        senderId,
                        message,
                        timestamp: newMessage.timestamp,
                        _id: newMessage._id
                    };
                    console.log('Broadcasting to room:', `order-chat-${orderId}`, messageToSend);
                    this.io.to(`order-chat-${orderId}`).emit('chat-message', messageToSend);
                } catch (error) {
                    console.error('Error saving chat message:', error);
                    socket.emit('chat-error', { error: 'Failed to send message' });
                }
            });

            // Handle typing indicators
            socket.on('typing-start', ({ orderId, userId }) => {
                socket.to(`order-chat-${orderId}`).emit('typing-start', { userId });
            });

            socket.on('typing-stop', ({ orderId, userId }) => {
                socket.to(`order-chat-${orderId}`).emit('typing-stop', { userId });
            });

            // Handle real-time order updates
            socket.on('order-update', ({ orderId, status }) => {
                this.io.emit('order-status-changed', { orderId, status });
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                // Remove user from connected users
                for (const [userId, socketId] of this.connectedUsers.entries()) {
                    if (socketId === socket.id) {
                        this.connectedUsers.delete(userId);
                        break;
                    }
                }
                console.log('User disconnected:', socket.id);
            });
        });
    }

    // Utility method to emit events to specific users
    emitToUser(userId, event, data) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.io.to(socketId).emit(event, data);
        }
    }

    // Create a new chat room for an order
    createChatRoom(orderId, farmerId, clientId) {
        const roomId = `order-chat-${orderId}`;
        this.chatRooms.set(roomId, {
            orderId,
            participants: [farmerId, clientId],
            createdAt: new Date()
        });

        // Notify participants about the new chat room
        this.emitToUser(farmerId, 'chat-room-created', { orderId, participants: [farmerId, clientId] });
        this.emitToUser(clientId, 'chat-room-created', { orderId, participants: [farmerId, clientId] });
    }

    // Utility method to broadcast events to all connected clients
    broadcast(event, data) {
        this.io.emit(event, data);
    }
}

module.exports = SocketService;