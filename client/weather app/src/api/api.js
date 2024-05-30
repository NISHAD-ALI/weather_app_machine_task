import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'http://localhost:3001'
})


export const saveToDb = async (weatherData) => {
    try {
        console.log("hello");
        const data = await axiosInstance.post('/saveToDb', {weatherData})
        return data
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const sendData = async () => {
    try {
        const data = await axiosInstance.get('/sendData')
        return data
    } catch (error) {
        console.log(error.response.data.message);
    }
}