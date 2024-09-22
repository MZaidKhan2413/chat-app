require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected...")
})
.catch((e)=>{
    console.log("Mongo error");
})

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(PORT, ()=>{
    console.log("App is listening at port: ",PORT);
})

const io = socket(server, {
    cors: {
      origin: "https://vibey-chat-app.vercel.app",
      credentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
