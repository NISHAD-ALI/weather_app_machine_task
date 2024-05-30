import express from 'express'
const app = express()
import mongoose from 'mongoose'

import cors from 'cors';



app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
}));


mongoose.connect('mongodb+srv://nishadalichenadan:VK6UWbD8jUbFVeOn@cluster0.c1bvlih.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(3001,()=>console.log('server started')
)