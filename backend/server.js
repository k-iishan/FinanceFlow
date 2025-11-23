import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import transactionsRoutes from './routes/transactions.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Body:', req.body);
    next();
});

// Add Clerk middleware to all routes to populate req.auth
app.use(ClerkExpressWithAuth());

// MongoDB Connection
const connectDB = async () => {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('PLACEHOLDER')) {
        console.error('❌ MongoDB URI is missing or invalid in .env');
        console.log('Please update backend/.env with your actual MongoDB URI.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    }
};

connectDB();

// Routes
app.use('/api/transactions', transactionsRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
