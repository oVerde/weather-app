import React, { useRef } from "react";
import { Input, Button, XStack } from "tamagui";
import { TextInput } from "react-native";

interface WeatherInputProps {
  city: string;
  setCity: (value: string) => void;
  onFetch: () => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({
  city,
  setCity,
  onFetch,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleFetch = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    onFetch();
  };

  return (
    <XStack gap="$4" width="100%" maxWidth={400}>
      <Input
        ref={inputRef}
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
      <Button onPress={handleFetch} disabled={!city}>
        Fetch
      </Button>
    </XStack>
  );
};

export default WeatherInput;
