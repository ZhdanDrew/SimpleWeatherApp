import React from "react";
import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ForecastItem {
  dt_txt: string;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number; sea_level: number };
  weather: { description: string; icon: string }[];
  clouds: { all: number };
  wind: { speed: number };
}

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <div className="forecast-container">
      {data.list.slice(0, 7).map((item, idx) => (
        <div className="forecast-card" key={idx}>
          <div className="forecast-card-header">
            <div className="day-label">{forecastDays[idx]}</div>
            <div className="description-label">{item.weather[0].description}</div>
            <img
              src={`icons/${item.weather[0].icon}.png`}
              className="weather-icon-small"
              alt="weather"
            />
          </div>
          <div className="forecast-details">
            <div className="parameter-row">
              <span className="parameter-label">Max Temperature:</span>
              <span className="parameter-value">{Math.round(item.main.temp_max)}°C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Min Temperature:</span>
              <span className="parameter-value">{Math.round(item.main.temp_min)}°C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure:</span>
              <span className="parameter-value">{item.main.pressure} hPa</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity:</span>
              <span className="parameter-value">{item.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Clouds:</span>
              <span className="parameter-value">{item.clouds.all}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind Speed:</span>
              <span className="parameter-value">{item.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels Like:</span>
              <span className="parameter-value">{item.main.feels_like}°C</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
