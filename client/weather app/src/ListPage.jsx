import React, { useState, useEffect } from 'react';
import { sendData } from './api/api';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await sendData()
                console.log(response.data.data)
                setWeatherData(response?.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);


    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4 bg-gradient-to-br from-teal-50 to-green-200 font-inter">
            <h2 className="text-2xl font-bold mb-4">Your Weather Data History</h2>
            <table className="min-w-full  border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Temperature (°C)</th>
                        <th className="px-4 py-2 border">Feels Like (°C)</th>
                        <th className="px-4 py-2 border">Main</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">City</th>
                        <th className="px-4 py-2 border">Country</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Sunset</th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">{Math.round(data.temp - 273.15)}</td>
                            <td className="px-4 py-2 border">{Math.round(data.feels_like - 273.15)}</td>
                            <td className="px-4 py-2 border">{data.main}</td>
                            <td className="px-4 py-2 border">{data.description}</td>
                            <td className="px-4 py-2 border">{data.city}</td>
                            <td className="px-4 py-2 border">{data.country}</td>
                            <td className="px-4 py-2 border">{new Date(data.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{new Date(data.sunset).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                onClick={()=>navigate('/')}
            >
                Back to Home
            </button>
        </div>
    );
};

export default ListPage;
