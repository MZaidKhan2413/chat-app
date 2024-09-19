require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{
    console.log("DB connected...")
})
.catch((e)=>{
    console.log("Mongo error");
})

app.use(cors());
app.use(express.json());


const server = app.listen(PORT, ()=>{
    console.log("App is listening at port: ",PORT);
})