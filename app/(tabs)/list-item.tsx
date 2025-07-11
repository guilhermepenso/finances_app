import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function ListItem() {
  return (
    <View>
      <View className="flex w-full h-full justify-center items-center">
        <Text>List Item</Text>
      </View>
    </View>
  );
}
