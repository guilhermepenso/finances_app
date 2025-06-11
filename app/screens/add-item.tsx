import { SafeAreaView, ScrollView, View } from "react-native";
import { MenuBar } from "~/components/ui/menu-bar";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function AddItem() {
  const [item, setItem] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [parcels, setParcels] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const onChangeNome = (texto: string) => {
    setItem(texto);
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
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Origem</Text>
                <Input
                  value={origin}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Pagamento</Text>
                <Input
                  value={payment}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Parcela</Text>
                <Input
                  value={parcels}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Valor</Text>
                <Input
                  value={value}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <View className="gap-y-2">
                <Text className="text-xl">Data</Text>
                <Input
                  value={date}
                  onChangeText={onChangeNome}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                />
              </View>
              <Button className="mt-10">
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
