import React, { useEffect, useState } from "react";
import "./App.css";
import Cloudy from "./assets/img/clouds.png";
import Rain from "./assets/img/run.png";
import Clear from "./assets/img/clear.png";
import Sun from "./assets/img/sun.png";
import Snow from "./assets/img/snow.png";
import Mist from "./assets/img/mist.png";

const _baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "6511e14723ad8cb6f243ece1366c5deb";

const App = () => {
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("");

  const fetchWeather = async (name = "Bishkek") => {
    try {
      const res = await fetch(`${_baseUrl}${name}&appid=${apiKey}`);

      const data = await res.json();
      console.log(data);
      setCityData(data);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!cityData) {
    return (
      <h1 style={{ textAlign: "center", paddingTop: "10rem", color: "red" }}>
        Loading...
      </h1>
    );
  }
  if (cityData.cod == 404) {
    return <h1>{cityData.message}</h1>;
  }

  return (
    <div
      style={{
        background: "linear-gradient(92.7deg, #4cb8c4 0%, #3cd3ad 100%)",
        height: "200px",
      }}
    >
      <div className="container">
        <div>
          <div>
            <h1
              style={{ paddingTop: "3%", color: "white" }}
              className="text-3xl"
            >
              Weather forecast
            </h1>
            <input
            className="w-[20%] sm-w-[40%] sm-custom:w-[60%]"
              style={{
                
                height: "35%",
                borderRadius: "3px",
                padding: "10px",
                marginTop: "2%",
                border: "none",
              }}
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              type="text"
              placeholder="Enter the name of the city"
            />
            <button
              style={{
               
                height: "42px",
                borderRadius: "3px",
                border: "none",
                background: "rgba(237, 48, 82, 1)",
                color: "white",
              }}
              className="w-[10%] md:w-[10%] sm-custom:w-[20%]"
              onClick={() => fetchWeather(cityName)}
            >
              Show
            </button>
          </div>
          <div className="w-full xl:w-[30%] lg:w-[38%]  md:w-[49%]  sm:w-[50%]  "
    style={{
        height: "325%",
        margin:"auto",
        marginTop:"10rem",
        // marginLeft: "36%",
        paddingTop: "2%",
        display: "flex",
        zIndex: "99",
        backgroundColor: "white",
        boxShadow: "2px 3px 10px 10px rgba(190, 188, 188, 0.183)",
        borderRadius: "6%",
        border: "1px solid grey",
        gap: "2rem",
        border: "none",
    }}
>
          
            <div style={{ padding: "7%" }}>
              <h3
                style={{ width: "102px", fontSize: "38px", fontWeight: "800" }}
              >
                {cityData.name}
              </h3>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontFamily: "Rubik",
                    fontSize: "70px",
                    fontWeight: "400",
                  }}
                >
                  {Math.floor(cityData.main.temp - 273.15)}{" "}
                </span>
                <span
                  style={{
                    fontFamily: "Rubik",
                    fontSize: "80px",
                    fontWeight: "400",
                    lineHeight: "92px",
                    textAlign: "left",
                  }}
                >
                  °c
                </span>
              </div>
              <div style={{ paddingTop: "10%" }}>
                <div
                  style={{
                    fontFamily: "Rubik",
                    fontSize: "20px",
                    fontWeight: "400",
                    lineHeight: "23.7px",
                    textAlign: "left",
                  }}
                >
                  <p>{cityData.weather[0].main}</p>
                  <p>Wind: {cityData.wind.speed} km</p>
                  <p>Country: {cityData.sys.country}</p>
                </div>
              </div>
            </div>
            <div>
              <img
                style={{ paddingTop: "70%" }}
                src={weatherImg(cityData.weather[0].main)}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
