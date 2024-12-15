// @ts-ignore
import { fetchWeather } from "../services/weatherService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchWeather", () => {
  it("should fetch weather data successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "London",
        sys: { country: "GB" },
        weather: [{ description: "clear sky", icon: "01d" }],
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        list: [
          {
            dt: 1600000000,
            main: { temp: 15 },
          },
          // Add more forecast data as needed
        ],
      },
    });

    const data = await fetchWeather("London");
    expect(data.city).toBe("London");
    expect(data.country).toBe("GB");
    expect(data.condition).toBe("clear sky");
    expect(data.icon).toBe("http://openweathermap.org/img/wn/01d@2x.png");
    expect(data.forecast.length).toBe(1);
    expect(data.forecast[0].temperature).toBe(15);
  });

  it("should throw an error when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));
    await expect(fetchWeather("InvalidCity")).rejects.toThrow("API Error");
  });
});
