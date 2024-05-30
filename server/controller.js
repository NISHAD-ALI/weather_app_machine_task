import model from "./model.js";


export const saveDb = async (req, res) => {
    try {
        const { weatherData } = req.body;
        const weather = new model({
            temp: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            city: weatherData.name,
            country: weatherData.sys.country,
            date: new Date(weatherData.dt * 1000),
            sunset: new Date(weatherData.sys.sunset * 1000),
            forecast: weatherData.forecast || []
        });

        await weather.save();
        res.status(201).send({ message: 'Weather data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to save weather data' });
    }

}


export const sendData = async(req,res) =>{
    try {
        const data = await model.find({})
        res.status(201).send({ message: 'Weather data saved successfully' ,data});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to save weather data' });
    }
}