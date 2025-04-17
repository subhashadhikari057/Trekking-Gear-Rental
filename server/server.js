// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');                 // Added for Socket.IO
const { Server } = require('socket.io');      // Added for Socket.IO



// Load env variables
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');




app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);


// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // or replace with frontend URL
    methods: ['GET', 'POST']
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('send_message', async (data) => {
    console.log('💬 Message received:', data);
    
    // 1. Broadcast message to all clients
    io.emit('receive_message', data);

    // 2. Save message to MongoDB
    try {
      const Message = require('./models/Message');

      await Message.create({
        sender: data.senderId,     // frontend must send senderId (user._id)
        content: data.content
      });

    } catch (err) {
      console.error('❌ Failed to save message:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});


// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
