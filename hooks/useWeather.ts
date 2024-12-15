import { useState } from "react";
import { WeatherData, fetchWeather } from "../services/weatherService";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { weather, error, loading, getWeather };
};
