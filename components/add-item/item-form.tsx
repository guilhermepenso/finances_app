import { Alert, ScrollView, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { openDatabase } from "~/services/db/db";
import { insertFinance } from "~/services/db/finances";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import CalendarPicker from "react-native-calendar-picker";
import { TimerPickerModal } from "react-native-timer-picker";

export const ItemForm: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [parcels, setParcels] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [hour, setHour] = useState<string>("");

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const onChangeNome = (texto: string) => setItem(texto);
  const onChangeTipo = (texto: string) => setType(texto);
  const onChangeOrigem = (texto: string) => setOrigin(texto);
  const onChangePagamento = (texto: string) => setPayment(texto);
  const onChangeParcela = (texto: string) => setParcels(texto);
  const onChangeValor = (texto: string) => setValue(texto);

  const onChangeHour = () => {
    setShowTimePicker(true);
  };

  const handleTimeConfirm = (pickedDuration: {
    hours: number;
    minutes: number;
  }) => {
    setSelectedHours(pickedDuration.hours);
    setSelectedMinutes(pickedDuration.minutes);
    setHour(
      `${pickedDuration.hours
        .toString()
        .padStart(2, "0")}:${pickedDuration.minutes
        .toString()
        .padStart(2, "0")}`
    );
    setShowTimePicker(false);
  };

  const handleSave = async () => {
    if (
      !item.trim() ||
      !type.trim() ||
      !origin.trim() ||
      !payment.trim() ||
      !parcels.trim() ||
      !value.trim() ||
      !day.trim() ||
      !hour.trim()
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
        date: `${day} ${hour}`,
      });
      Alert.alert("Sucesso", "Item adicionado com sucesso!");
      setItem("");
      setType("");
      setOrigin("");
      setPayment("");
      setParcels("");
      setValue("");
      setDay("");
      setHour("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o item.");
    }
  };

  return (
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
              placeholder="..."
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-xl">Tipo</Text>
            <Input
              value={type}
              onChangeText={onChangeTipo}
              placeholder="..."
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-xl">Origem</Text>
            <Input
              value={origin}
              onChangeText={onChangeOrigem}
              placeholder="..."
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-xl">Pagamento</Text>
            <Input
              value={payment}
              onChangeText={onChangePagamento}
              placeholder="..."
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-xl">Parcela</Text>
            <Input
              value={parcels}
              onChangeText={onChangeParcela}
              placeholder="..."
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
              placeholder="..."
              keyboardType="numeric"
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View className="flex flex-row gap-x-4">
            <View className="flex-1 gap-y-2">
              <Text className="text-xl">Data</Text>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Text className="native:text-lg">{day || "..."}</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex max-w-[95vw] ">
                  <View className="flex justify-center items-center mt-8">
                    <CalendarPicker
                      onDateChange={(date) => {
                        setDay(date.toISOString().slice(0, 10));
                      }}
                      months={[
                        "Janeiro",
                        "Fevereiro",
                        "Março",
                        "Abril",
                        "Maio",
                        "Junho",
                        "Julho",
                        "Agosto",
                        "Setembro",
                        "Outubro",
                        "Novembro",
                        "Dezembro",
                      ]}
                      weekdays={[
                        "Dom",
                        "Seg",
                        "Ter",
                        "Qua",
                        "Qui",
                        "Sex",
                        "Sáb",
                      ]}
                      textStyle={{ color: "#fff" }}
                      selectedDayColor="#4F46E5"
                      todayBackgroundColor="#E0E7FF"
                      previousTitleStyle={{ fontSize: 25 }}
                      previousTitle="       <"
                      nextTitleStyle={{ fontSize: 25 }}
                      nextTitle=">       "
                    />
                  </View>
                </DialogContent>
              </Dialog>
            </View>
            <View className="w-28 gap-y-2">
              <Text className="text-xl">Hora</Text>
              <Button variant="outline" onPress={onChangeHour}>
                <Text className="native:text-lg">{hour || "..."}</Text>
              </Button>

              <TimerPickerModal
                visible={showTimePicker}
                setIsVisible={setShowTimePicker}
                onConfirm={handleTimeConfirm}
                onCancel={() => setShowTimePicker(false)}
                closeOnOverlayPress
                modalTitle="Selecionar Hora"
                hideSeconds
                initialValue={{
                  hours: selectedHours,
                  minutes: selectedMinutes,
                }}
                styles={{
                  theme: "dark",
                  pickerItem: {
                    fontSize: 24,
                  },
                  pickerLabel: {
                    fontSize: 24,
                  },
                }}
              />
            </View>
          </View>
          <Button className="mt-10" onPress={handleSave}>
            <Text className="native:text-xl">Salvar Item</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
