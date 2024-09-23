require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
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

app.use(cors({
    origin: 'https://vibey-chat-app.vercel.app',
    credentials: true,
    methods: ['GET', 'POST']
}));

const server = http.createServer(app);

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        // credentials: true,
        // transports: ['websocket', 'polling'],
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

server.listen(PORT, ()=>{
    console.log("App is listening at port: ",PORT);
})