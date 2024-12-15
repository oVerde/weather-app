import { Anchor, Paragraph, View, XStack } from "tamagui";

export default function ModalScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <XStack gap="$2">
        <Paragraph ta="center" color="lightgray">
          Challenge for 1Global
        </Paragraph>
        <Paragraph col="$blue10">by Danilo</Paragraph>
        <Paragraph color="$purple10">give it a 🌟</Paragraph>
      </XStack>
    </View>
  );
}
