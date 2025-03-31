import { SafeAreaView } from "react-native";
import { History } from "~/components/ui/home/history";
import { Resume } from "~/components/ui/home/resume";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center mt-16">
      <Resume />
      <History />
    </SafeAreaView>
  );
}
