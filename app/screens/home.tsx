import { SafeAreaView, View } from "react-native";
import { History } from "~/components/ui/home/history";
import { Resume } from "~/components/ui/home/resume";
import { MenuBar } from "~/components/ui/menu-bar";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <View className="flex h-[90%]">
        <Resume />
        <History />
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
