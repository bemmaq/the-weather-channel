import React, { useEffect, useState } from "react";
import "./App.css";
import Cloudy from "./assets/img/clouds.png";
import Rain from "./assets/img/run.png";
import Clear from "./assets/img/clear.png";
import Sun from "./assets/img/sun.png";
import Snow from "./assets/img/snow.png";
import Mist from "./assets/img/mist.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const _baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "6511e14723ad8cb6f243ece1366c5deb";

const App = () => {
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = async (name = "Bishkek") => {
    try {
      const res = await fetch(`${_baseUrl}${name}&appid=${apiKey}`);
      const data = await res.json();
      if (data.cod === "404") {
        setError("City not found");
        setCityData(null);
      } else {
        setCityData(data);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data");
    }
  };

  const weatherImg = (weather) => {
    switch (weather) {
      case "Rain":
        return Rain;

      case "Clouds":
        return Cloudy;

      case "Clear":
        return Clear;

      case "Snow":
        return Snow;

      case "Sun":
        return Sun;

      case "Mist":
        return Mist;

      default:
        return;
    }
  };

  // Enter баскычын басканда чакырылуучу функция
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather(cityName);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (error) {
    return (
      <h1 style={{ textAlign: "center", paddingTop: "10rem", color: "red" }}>
        {error}
      </h1>
    );
  }

  if (!cityData) {
    return (
      <h1 style={{ textAlign: "center", paddingTop: "10rem", color: "red" }}>
        Loading...
      </h1>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(92.7deg, #4cb8c4 0%, #3cd3ad 100%)",
        height: "200px",
      }}
    >
      <div className="container mx-auto px-4">
        <div>
          <div className="relative">
            <h1 className="text-3xl sm:text-xl md:text-2xl pt-4 text-white">
              Weather forecast
            </h1>
            <input
              className="w-full outline-none sm:w-[60%] md:w-[40%] lg:w-[20%] p-2 mt-4 rounded-md border-none"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={handleKeyPress} 
              type="text"
              placeholder="Enter the name of the city"
            />
            <button
              className="absolute outline-none top-[76px] md:left-[30rem] lg:left-[54rem] md:top-[73px] sm:left-3 left-80"
              onClick={() => fetchWeather(cityName)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="w-full lg:w-[30%] md:w-[40%] sm:w-[50%] mx-auto mt-40 p-6 bg-white shadow-lg rounded-lg flex gap-4">
            <div className="flex-1">
              <h3 className="text-4xl sm:text-3xl md:text-2xl font-bold">
                {cityData.name}
              </h3>
              <div className="flex">
                <span className="text-6xl sm:text-5xl pl-3 ">
                  {Math.floor(cityData.main.temp - 273.15)}
                </span>
                <span className="text-7xl sm:text-6xl">°C</span>
              </div>
              <div className="pt-10">
                <div className="text-lg">
                  <p>{cityData.weather[0].main}</p>
                  <p>Wind: {cityData.wind.speed} km/h</p>
                  <p>Country: {cityData.sys.country}</p>
                </div>
              </div>
            </div>
            <div>
              <img
                className="pt-10 sm:pt-16 md:pt-10"
                src={weatherImg(cityData.weather[0].main)}
                alt="weather-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
