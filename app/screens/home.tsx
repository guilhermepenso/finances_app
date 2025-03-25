import { SafeAreaView } from "react-native";
import { Resume } from "~/components/ui/home/resume";
import { Text } from "~/components/ui/text";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Resume />
    </SafeAreaView>
  );
}
