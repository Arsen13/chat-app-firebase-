const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT} port`);
})