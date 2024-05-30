import React from 'react'
import WeatherComponent from './WeatherComponent'

const HomePage = () => {
    return (
        <div className="App flex items-center justify-center min-h-screen" style={{ backgroundImage: "url(./public/dani-guitarra-7JbUsmYPwP8-unsplash.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <WeatherComponent />
        </div>
    )
}

export default HomePage
