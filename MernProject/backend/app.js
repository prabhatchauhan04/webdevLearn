import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io"; // importing the Server class that Socket.IO exports.
import cors from 'cors';
import authRoutes from './http/routes/auth.routes.js';
import env from './env.js'; 

const PORT = env.PORT || 4444;

const app = express();


app.use(express.urlencoded({ extended: true })); // complex objects ko handle karne ke liye jinmein emojis wagaira hote hain
app.use(express.json()); // application/json content-type wali requests ko handle karne ke liye


app.use(cors({
    origin: env.CORS_ORIGIN,
}));


const httpServer = createServer(app); // http.createServer(app)
app.use('/api/auth' , authRoutes); // koi bhi request /api/auth pe aayegi to authRoutes handle karega


httpServer.listen(PORT, () => {
    console.log("http://localhost:", PORT);
})


