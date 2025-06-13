import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { History } from "~/components/ui/home/history";
import { MonthPicker } from "~/components/ui/home/month-picker";
import { Resume } from "~/components/ui/home/resume";
import { MenuBar } from "~/components/ui/menu-bar";

export default function Home() {
  const [month, setMonth] = useState<string>("");

  useEffect(() => {
    const formattedMonth = new Date().toLocaleDateString("pt-BR", { month: "numeric", year: "numeric" });
    setMonth(formattedMonth);
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background mt-20">
      <View className="flex h-[90%]">
        <MonthPicker month={month} setMonth={setMonth} />
        <Resume month={month} />
        <History month={month} />
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
