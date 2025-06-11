import { SafeAreaView, View } from "react-native";
import { MenuBar } from "~/components/ui/menu-bar";
import { Text } from "~/components/ui/text";

export default function ListItem() {
  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <View className="flex h-[90%]">
        <View className="flex w-full h-full justify-center items-center">
          <Text>List Item</Text>
        </View>
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
