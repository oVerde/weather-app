import "@testing-library/jest-native/extend-expect";
import { render, fireEvent } from "@testing-library/react-native";
import WeatherScreen from "../app/index";
import * as weatherHook from "../hooks/useWeather";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

jest.mock("../hooks/useWeather");
const Provider = ({ children }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

describe("WeatherScreen", () => {
  it("renders correctly and fetches weather", async () => {
    const mockGetWeather = jest.fn();
    (weatherHook.useWeather as jest.Mock).mockReturnValue({
      weather: null,
      error: "",
      loading: false,
      getWeather: mockGetWeather,
    });

    const { getByTestId } = render(
      <Provider>
        <WeatherScreen />
      </Provider>,
    );

    const input = getByTestId("city-input");
    const button = getByTestId("fetch-button");

    fireEvent.changeText(input, "London");
    fireEvent.press(button);

    expect(mockGetWeather).toHaveBeenCalledWith("London");
    expect(getByTestId("city-input").props.value).toBe("London");
  });

  it("displays loading indicator", () => {
    (weatherHook.useWeather as jest.Mock).mockReturnValue({
      weather: null,
      error: "",
      loading: true,
      getWeather: jest.fn(),
    });

    const { getByText } = render(
      <Provider>
        <WeatherScreen />
      </Provider>,
    );
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("displays error message", () => {
    (weatherHook.useWeather as jest.Mock).mockReturnValue({
      weather: null,
      error: "Failed to fetch weather data.",
      loading: false,
      getWeather: jest.fn(),
    });

    const { getByTestId } = render(
      <Provider>
        <WeatherScreen />
      </Provider>,
    );
    expect(getByTestId("error")).toBeTruthy();
  });

  it("displays weather data", () => {
    (weatherHook.useWeather as jest.Mock).mockReturnValue({
      weather: {
        city: "London",
        country: "GB",
        condition: "clear sky",
        icon: "http://openweathermap.org/img/wn/01d@2x.png",
        forecast: [
          { time: "10:00 AM", temperature: "15.0" },
          { time: "11:00 AM", temperature: "16.5" },
        ],
      },
      error: "",
      loading: false,
      getWeather: jest.fn(),
    });

    const { getByTestId, getByText } = render(
      <Provider>
        <WeatherScreen />
      </Provider>,
    );
    expect(getByTestId("city-country")).toHaveTextContent("London, GB");
    expect(getByTestId("weather-condition")).toHaveTextContent("clear sky");
    expect(getByText("10:00 AM")).toBeTruthy();
    expect(getByTestId("temperature-0")).toHaveTextContent("15.0°F");
  });
});
