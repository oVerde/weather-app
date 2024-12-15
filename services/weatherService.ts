import axios from "axios";

export interface WeatherData {
  city: string;
  country: string;
  condition: string;
  icon: string;
  forecast: Array<{ time: string; temperature: number }>;
}

const API_KEY = "36380d2bbe23947714ff21d914a5c5b9";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    },
  );

  const forecastResponse = await axios.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    },
  );

  return {
    city: response.data.name,
    country: response.data.sys.country,
    condition: response.data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    forecast: forecastResponse.data.list.slice(0, 5).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: item.main.temp,
    })),
  };
};
