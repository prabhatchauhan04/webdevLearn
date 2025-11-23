const express = require("express");
const { createServer } = require("http"); //require http
const { Server } = require("socket.io");  //require server from socket.io
const path= require('path');

const app = express();
const httpServer = createServer(app);  //http gets a refrence of the app
const io = new Server(httpServer, { /* options */ });

app.use(express.static(path.join(__dirname,'public')));

// connecting the socket
io.on("connection", (socket) => {
  console.log("client connected", socket.id); 

  //   all the event triggering is written in the io.on() function
  socket.on('chat',(chatdata)=>{
      console.log(chatdata.data)

      // io.emit('grpchat',chatdata.data)
      socket.broadcast.emit('notme',chatdata.data);
  })

});

httpServer.listen(3000,()=>{
    console.log(`http://localhost:3000`)
}); 
  