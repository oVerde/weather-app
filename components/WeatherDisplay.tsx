import React from "react";
import { Text, XStack, YStack, Image } from "tamagui";
import { WeatherData } from "../services/weatherService";

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => (
  <YStack gap="$2" ai="center">
    <Text fontSize="$4" fontWeight="bold">
      {weather.city}, {weather.country}
    </Text>
    <XStack ai="center" gap="$2">
      <Image source={{ uri: weather.icon }} width={50} height={50} />
      <Text fontSize="$4">{weather.condition}</Text>
    </XStack>
    <YStack gap="$1">
      {weather.forecast.map((item, index) => (
        <XStack key={index} gap="$4" justifyContent="space-between">
          <Text>{item.time}</Text>
          <Text>{item.temperature}°F</Text>
        </XStack>
      ))}
    </YStack>
  </YStack>
);

export default WeatherDisplay;
