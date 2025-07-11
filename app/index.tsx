import { Text } from "@/ui/text";
import { Redirect } from "expo-router";
import { View } from "lucide-react-native";
import { useEffect } from "react";
import { SafeAreaView, TextInput } from "react-native";
import { openDatabase } from "~/services/db/db";
import { createFinancesTable } from "~/services/db/finances";

export default function App() {
  useEffect(() => {
    criarBancos();
  }, []);

  const criarBancos = async () => {
    const db = await openDatabase("finances.db");
    await createFinancesTable(db);
  };

  return (
    <Redirect href={'/(tabs)/home'}/>
  );
}
