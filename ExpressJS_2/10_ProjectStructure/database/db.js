const mongoose = require('mongoose'); // Mongoose library import kiya jo MongoDB ke sath interact karne me help karta hai

// Async function banaya taaki DB connect kar sake aur await use kar sake
async function connectMongo() {
    // // Agar aap cloud MongoDB Atlas use kar rahe ho, URL is tarah hoga
    // // cluster0.97kax2o.mongodb.net → Cluster address on MongoDB Atlas
    // // This tells Mongoose which server(s) to connect to
    // // retryWrites=true ka matlab hai ki write operations retry honge agar fail hote hain
    // // and w=majority → write concern, ensures write is acknowledged by majority of nodes
    // // appName=Cluster0 optional hai it just names ur application in Atlas logs
    // let url = `mongodb+srv://username:password@cluster0.97kax2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    
    // Local MongoDB ke liye connection string
    await mongoose.connect('mongodb://localhost:27017/todos'); 
    // await isliye use kiya taki ye line execute hone tak next code wait kare, 
    // nahi toh DB connect hone se pehle queries execute ho sakti thi
}

// Ye function export kiya, taaki server.js ya app.js me import karke DB connect kiya ja sake
module.exports = connectMongo;
