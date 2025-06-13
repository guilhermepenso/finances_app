import { SafeAreaView, ScrollView, View, Alert } from "react-native";
import { MenuBar } from "~/components/ui/menu-bar";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { openDatabase } from "~/services/db/db";
import { insertFinance } from "~/services/db/finances";

export default function AddItem() {
  const [item, setItem] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [parcels, setParcels] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Funções de onChange para cada campo
  const onChangeNome = (texto: string) => setItem(texto);
  const onChangeTipo = (texto: string) => setType(texto);
  const onChangeOrigem = (texto: string) => setOrigin(texto);
  const onChangePagamento = (texto: string) => setPayment(texto);
  const onChangeParcela = (texto: string) => setParcels(texto);
  const onChangeValor = (texto: string) => setValue(texto);
  const onChangeData = (texto: string) => setDate(texto);

  const handleSave = async () => {
    // Validação simples: todos os campos obrigatórios
    if (
      !item.trim() ||
      !type.trim() ||
      !origin.trim() ||
      !payment.trim() ||
      !parcels.trim() ||
      !value.trim() ||
      !date.trim()
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const db = await openDatabase("finances.db");
      await insertFinance(db, {
        item,
        type,
        origin,
        payment,
        parcels: Number(parcels),
        value: Number(value),
        date,
      });
      Alert.alert("Sucesso", "Item adicionado com sucesso!");
      // Limpa os campos após salvar
      setItem("");
      setType("");
      setOrigin("");
      setPayment("");
      setParcels("");
      setValue("");
      setDate("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o item.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <View className="flex h-[90%]">
        <View className="flex w-full h-full justify-center items-center">
          <View className="flex w-full h-[10%] justify-center items-center">
            <Text className="text-2xl font-bold mb-4">Adicionar Item</Text>
          </View>
          <ScrollView className="flex w-11/12 mt-4">
            <View className="gap-y-4">
              <View className="gap-y-2">
                <Text className="text-xl">Nome</Text>
                <Input
                  value={item}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Tipo</Text>
                <Input
                  value={type}
                  onChangeText={onChangeTipo}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Origem</Text>
                <Input
                  value={origin}
                  onChangeText={onChangeOrigem}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Pagamento</Text>
                <Input
                  value={payment}
                  onChangeText={onChangePagamento}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Parcela</Text>
                <Input
                  value={parcels}
                  onChangeText={onChangeParcela}
                  keyboardType="numeric"
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Valor</Text>
                <Input
                  value={value}
                  onChangeText={onChangeValor}
                  keyboardType="numeric"
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Data</Text>
                <Input
                  value={date}
                  onChangeText={onChangeData}
                  placeholder="YYYY-MM-DD"
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <Button className="mt-10" onPress={handleSave}>
                <Text className="native:text-xl">Salvar Item</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
