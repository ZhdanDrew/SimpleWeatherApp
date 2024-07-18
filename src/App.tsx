import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  clouds: { all: number };
  city: string;
}

interface ForecastResponse {
  list: WeatherItem[];
  city: string;
}

interface WeatherItem {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  clouds: { all: number };
}

interface SearchData {
  value: string;
  label: string;
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  const handleOnSearchChange = (searchData: SearchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse: WeatherResponse = await response[0].json();
        const forecastResponse: ForecastResponse = await response[1].json();

        setCurrentWeather({ ...weatherResponse, city: searchData.label });
        setForecast({ ...forecastResponse, city: searchData.label });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
