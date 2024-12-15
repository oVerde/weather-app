import { useState } from "react";
import { Text, YStack } from "tamagui";
import { useWeather } from "../hooks/useWeather";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherInput from "../components/WeatherInput";
import { Keyboard } from "react-native";

export default function WeatherScreen() {
  const { weather, error, loading, getWeather } = useWeather();
  const [city, setCity] = useState("");

  return (
    <YStack
      f={1}
      onTouchEndCapture={() => Keyboard.dismiss()}
      ai="center"
      p="$10"
      bg="$background"
      pt="$15"
      gap="$2"
    >
      <WeatherInput
        city={city}
        setCity={setCity}
        onFetch={() => getWeather(city)}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text color="$red10">{error}</Text>}
      {weather && <WeatherDisplay weather={weather} />}
    </YStack>
  );
}

/**
 *The `app/index.tsx` file serves as the main entry point for the WeatherScreen component. 

  1. **Imports and Dependencies**:
   - **React Hooks**: Utilizes `useState` from React to manage the local state for the city input.
   - **Tamagui Components**: Imports `Text` and `YStack` from Tamagui for consistent styling and layout.
   - **Custom Hooks and Components**: 
     - `useWeather`: A custom hook that handles fetching weather data, managing loading and error states.
     - `WeatherDisplay` and `WeatherInput`: Reusable components that encapsulate the display of weather information and the input form for the city, respectively.

  2. **State Management**:
   - **City State**: Maintains the current city input by the user using the `useState` hook.
   - **Weather Data**: Managed by the `useWeather` hook, which provides `weather`, `error`, `loading`, and `getWeather` functions to handle API interactions.

  3. **Component Structure**:
   - **YStack Layout**: Provides a vertically stacked layout with centered alignment and padding, ensuring a responsive and aesthetically pleasing UI.
   - **WeatherInput Component**: Allows users to input a city name and initiate the weather fetching process.
   - **Conditional Rendering**:
     - Displays a loading indicator while fetching data.
     - Shows error messages if the fetch fails.
     - Renders the `WeatherDisplay` component to show the fetched weather information upon successful retrieval.

  4. **Functionality**:
   - The `onFetch` prop in the `WeatherInput` component triggers the `getWeather` function with the current city, initiating the data fetching process.
   - The component efficiently handles different states (loading, error, success) to provide feedback to the user and display relevant information.

  5. **Best Practices**:
   - **Separation of Concerns**: By splitting the input and display functionalities into separate components (`WeatherInput` and `WeatherDisplay`), the code remains modular and easier to maintain.
   - **Custom Hooks**: Encapsulating the weather fetching logic within the `useWeather` hook promotes reusability and cleaner component code.
   - **Styling with Tamagui**: Leveraging Tamagui ensures consistent styling across components and simplifies responsive design.

**/
