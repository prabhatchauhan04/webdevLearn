import dotenv from 'dotenv';
dotenv.config();



const env = {
    PORT: process.env.PORT || 4444,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://localhost:5173',
    JWT_SECRET: process.env.JWT_SECRET,
};


export default env;
