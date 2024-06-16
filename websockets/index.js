const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static('/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})


// Socket connection
io.on("connection",(socket)=>{
socket.on('Client1',(msg)=>{
io.emit("globalMessage",msg)
})
})





server.listen(9000,()=>{
    console.log('socket server running port 9000')
})