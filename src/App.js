import "./App.css";
import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("Manchester");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search},GB&appid=${API_KEY}&units=metric`
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleFetch();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };

  const getWeather = () => {
    if (data.weather[0].icon === "01d") {
      return "http://openweathermap.org/img/wn/01d@2x.png";
    } else if (data.weather[0].icon === "02d") {
      return "http://openweathermap.org/img/wn/02d@2x.png";
    } else if (data.weather[0].icon === "03d") {
      return "http://openweathermap.org/img/wn/03d@2x.png";
    } else if (data.weather[0].icon === "04d") {
      return "http://openweathermap.org/img/wn/04d@2x.png";
    } else if (data.weather[0].icon === "09d") {
      return "http://openweathermap.org/img/wn/09d@2x.png";
    } else if (data.weather[0].icon === "10d") {
      return "http://openweathermap.org/img/wn/10d@2x.png";
    } else if (data.weather[0].icon === "11d") {
      return "http://openweathermap.org/img/wn/11d@2x.png";
    } else if (data.weather[0].icon === "13d") {
      return "http://openweathermap.org/img/wn/13d@2x.png";
    } else if (data.weather[0].icon === "50d") {
      return "http://openweathermap.org/img/wn/50d@2x.png";
    } else {
      return null;
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return (
      <>
        <h1>Error.</h1>
        <p>{error}</p>
      </>
    );
  return (
    <div className="app">
      <form className="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {data.main && (
        <div className="container">
          <h2 className="city">City: {data.name}</h2>
          <CurrentWeather
            classname="image"
            image={getWeather()}
            description={data.weather[0].description}
          />
          <p classname="text">Temp: {Math.floor(data.main.temp)}°C</p>
          <p>Max Temp: {Math.floor(data.main.temp_max)}°C</p>
          <p>Min Temp: {Math.floor(data.main.temp_min)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p className="info">Wind Speed: {data.wind.speed} KPH</p>
        </div>
      )}
    </div>
  );
};

const CurrentWeather = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.description}></img>
    </div>
  );
};

export default App;
