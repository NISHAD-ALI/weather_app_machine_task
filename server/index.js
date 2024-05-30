import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors';
import router from './router.js';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    credentials: true 
}));
app.use('/',router)
mongoose.connect('mongodb+srv://nishadalichenadan:VK6UWbD8jUbFVeOn@cluster0.c1bvlih.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(3001,()=>console.log('server started')
)