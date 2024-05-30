// models/Weather.js

import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    temp: {
        type: Number,
        required: true
    },
    feels_like: {
        type: Number,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sunset: {
        type: Date,
        required: true
    },
    forecast: {
        type: Array,
        required: false
    }
});

const model = mongoose.model('Weather', weatherSchema);
export default model;
