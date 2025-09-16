const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/agrilink');
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('\nPlease make sure that:');
        console.log('1. MongoDB is installed on your computer');
        console.log('2. MongoDB service is running (you can start it from MongoDB Compass)');
        console.log('3. MongoDB Compass is connected to mongodb://127.0.0.1:27017\n');
        process.exit(1);
    }
};

module.exports = connectDB;
