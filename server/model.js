import mongoose from 'mongoose'

const weatherSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    weatherDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    feelsLike: {
        type: Number,
        required: true
    },
    sunsetTime: {
        type: String,
        required: true
    }
});

const model = mongoose.model('Weather', weatherSchema);
export default model
