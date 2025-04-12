require('dotenv').config();
const express = require('express');
const cors = require("cors")

const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { generalLimiter } = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());
connectDB();

app.use(cors({
    credentials: true,
    origin: "http://localhost:8080",
}));

// Apply rate limiting globally (protects all routes)
app.use(generalLimiter);

app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes); // Assuming you want to use the same routes for AI

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));