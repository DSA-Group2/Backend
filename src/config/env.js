const dotenv = require('dotenv');
dotenv.config();

const envConfig = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 5000,
};

module.exports = envConfig;
