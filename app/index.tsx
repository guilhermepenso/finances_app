import { Redirect } from "expo-router";
import { useEffect } from "react";
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

  return <Redirect href={"/screens/home"} />;
}
