import { useEffect, useState } from "react";
import { View } from "react-native";
import { History } from "~/components/home/history";
import { MonthPicker } from "~/components/home/month-picker";
import { Resume } from "~/components/home/resume";

export default function Home() {
  const [month, setMonth] = useState<string>("");

  useEffect(() => {
    const formattedMonth = new Date().toLocaleDateString("pt-BR", {
      month: "numeric",
      year: "numeric",
    });
    setMonth(formattedMonth);
  }, []);

  return (
    <View>
      <MonthPicker month={month} setMonth={setMonth} />
      <Resume month={month} />
      <History month={month} />
    </View>
  );
}
