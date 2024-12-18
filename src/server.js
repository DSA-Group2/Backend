const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const codeRoutes = require('./routes/codeRoutes');
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
