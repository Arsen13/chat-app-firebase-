const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const { app, server } = require('./socket/socket');

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: "Too many atempt. Try later" },
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
})

server.listen(PORT, () => {
    console.log(`Server is running on: ${PORT} port`);
})