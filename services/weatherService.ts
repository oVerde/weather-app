import axios from "axios";

export interface WeatherData {
  city: string;
  country: string;
  condition: string;
  icon: string;
  forecast: Array<{ time: string; temperature: number }>;
}

const API_KEY =
  process.env.OPENWEATHER_API_KEY || "36380d2bbe23947714ff21d914a5c5b9";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const [response, forecastResponse] = await Promise.all([
      axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
        timeout: 5000, // 5 seconds timeout
      }),
      axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
        timeout: 5000, // 5 seconds timeout
      }),
    ]);

    // Validate weather API response
    if (
      !response.data ||
      !response.data.name ||
      !response.data.sys ||
      !response.data.sys.country ||
      !response.data.weather ||
      !Array.isArray(response.data.weather) ||
      response.data.weather.length === 0 ||
      !response.data.weather[0].description ||
      !response.data.weather[0].icon
    ) {
      throw new Error("Incomplete weather data received from API.");
    }

    // Validate forecast API response
    if (
      !forecastResponse.data ||
      !forecastResponse.data.list ||
      !Array.isArray(forecastResponse.data.list)
    ) {
      throw new Error("Incomplete forecast data received from API.");
    }

    return {
      city: response.data.name,
      country: response.data.sys.country,
      condition: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      forecast: forecastResponse.data.list.slice(0, 2).map((item: any) => {
        // This slice is getting the next 5 hours forecast into two separated items
        if (!item.dt || !item.main || typeof item.main.temp !== "number") {
          throw new Error("Incomplete forecast item data.");
        }

        return {
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temperature: Math.round(item.main.temp * 10) / 10,
        };
      }),
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again later.");
      }
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 404) {
          throw new Error("City not found. Please check the city name.");
        }
        throw new Error(
          `API Error: ${error.response.status} ${error.response.statusText}`,
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(
          "No response from the weather service. Please try again.",
        );
      } else {
        // Something happened in setting up the request
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      // Non-Axios error
      throw new Error(`Unexpected error: ${error.message || error}`);
    }
  }
};
