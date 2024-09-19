require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes.js")

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/vibey')
.then(()=>{
    console.log("DB connected...")
})
.catch((e)=>{
    console.log("Mongo error");
})

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

const server = app.listen(PORT, ()=>{
    console.log("App is listening at port: ",PORT);
})