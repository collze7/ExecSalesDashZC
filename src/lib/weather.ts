import axios from 'axios';

const WEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  city: string;
}

export async function getCurrentWeather(location?: string): Promise<WeatherData> {
  try {
    const city = location || process.env.WEATHER_LOCATION || 'New York,US';
    const units = process.env.WEATHER_UNITS || 'imperial';

    const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: units,
      },
    });

    const data = response.data;

    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: Math.round(data.wind.speed),
      city: data.name,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function getForecast(location?: string, days: number = 5) {
  try {
    const city = location || process.env.WEATHER_LOCATION || 'New York,US';
    const units = process.env.WEATHER_UNITS || 'imperial';

    const response = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: units,
        cnt: days * 8, // 8 forecasts per day (every 3 hours)
      },
    });

    return response.data.list.map((item: any) => ({
      dt: item.dt,
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: new Date(item.dt * 1000),
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}