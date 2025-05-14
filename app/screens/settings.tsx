import { View } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuBar } from "~/components/ui/menu-bar";
import { Text } from "~/components/ui/text";

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <View className="flex h-[90%]">
        <Text>Settings</Text>
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
