import React from "react";
import { Input, Button, XStack } from "tamagui";

interface WeatherInputProps {
  city: string;
  setCity: (value: string) => void;
  onFetch: () => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({
  city,
  setCity,
  onFetch,
}) => (
  <XStack gap="$4" width="100%" maxWidth={400}>
    <Input
      placeholder="Enter city name"
      value={city}
      onChangeText={setCity}
      ai="center"
      jc="center"
      borderColor="$borderColor"
      borderWidth={1}
      borderRadius="$2"
      padding="$3"
      flex={1}
    />
    <Button onPress={onFetch} disabled={!city}>
      Fetch
    </Button>
  </XStack>
);

export default WeatherInput;
