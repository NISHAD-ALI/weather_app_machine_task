import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherComponent = () => {
    const [city, setCity] = useState('California'); // Default to California
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d430440716babfdf10812291f567bb9f`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchForecastData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d430440716babfdf10812291f567bb9f`);
                if (!response.ok) {
                    throw new Error('Failed to fetch forecast data');
                }
                const data = await response.json();
                setWeatherData(prevState => ({ ...prevState, forecast: data.list }));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (city) {
            fetchWeatherData();
            fetchForecastData(); 
        }
    }, [city]);

    // Function to render weather icon based on weather condition
    const renderWeatherIcon = () => {
        if (!weatherData || !weatherData.weather || !weatherData.weather[0]) return null;

        const weatherMain = weatherData.weather[0].main;

        switch (weatherMain) {
            case 'Clear':
                return <FontAwesomeIcon icon={faSun} />;
            case 'Clouds':
                return <FontAwesomeIcon icon={faCloud} />;
            case 'Drizzle':
            case 'Rain':
                return <FontAwesomeIcon icon={faCloudRain} />;
            case 'Snow':
                return <FontAwesomeIcon icon={faSnowflake} />;
            default:
                return null;
        }
    };

    // Function to render the weather forecast
    const renderWeatherForecast = () => {
        if (!weatherData || !weatherData.forecast || weatherData.forecast.length === 0) return null;

        return (
            <div className="text-center">

                <div className="flex justify-center mt-2 ">
                    {weatherData.forecast.slice(0, 5).map((item, index) => (
                        <div key={index} className="ml-4">
                            <p>{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p>{Math.round(item.main.temp - 273.15)}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    const sendDataToBackend = async () => {
        try {
            const response = await saveToDb(weatherData)
            console.log(response+"response")
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    return (
        <>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3 p-10">
                <div className="md:w-1/3 bg-orange-200 rounded-2xl p-20 h-auto">
                    <div className="text-6xl font-medium mb-4">
                        {weatherData ? Math.round(weatherData.main.temp - 273.15) : ''}°C {renderWeatherIcon()}
                    </div>
                    <div className="text-3xl mb-4">{weatherData ? weatherData.weather[0].main : ''}</div>
                    <div className="mt-2 text-sm text-gray-700">
                        <div className="mb-2">{weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : ''}</div>
                        <div className="mb-2">{weatherData ? new Date(weatherData.dt * 1000).toLocaleDateString() : ''}</div>
                        <div>{weatherData ? `Feels like ${Math.round(weatherData.main.feels_like - 273.15)}` : ''} | {weatherData ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : ''}</div>
                    </div>
                </div>


                <div className="md:w-1/3">
                    <div className="bg-transparent rounded-2xl p-4 mb-4 border border-black shadow-lg" style={{ backdropFilter: 'blur(10px)' }}>
                        <div className="grid gap-4 mt-4 p-10">
                            <div className="text-center text-white">
                                {renderWeatherForecast()}
                            </div>
                        </div>
                    </div>



                    <div className="bg-transparent rounded-2xl p-4">
                        <div className="text-sm text-white font-medium">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-transparent rounded-2xl p-4">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            className="p-2 border border-gray-400 rounded-lg"
                            value={city}
                            onChange={handleCityChange}
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2" onClick={sendDataToBackend}>Search</button>
                    </div>
            </div>
        </>
    );
};

export default WeatherComponent;

