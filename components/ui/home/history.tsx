import { View } from "react-native";
import { Text } from "../text";

export const History: React.FC = () => {

  return (
    <View className="w-full h-3/5 m-2 gap-y-3 items-center">
      <View className="flex flex-row w-11/12 justify-start items-start p-2">
        <Text className="font-bold text-2xl">Histórico</Text>
      </View>
      <Text>Tabs </Text>
      <Text>Table </Text>
    </View>
  );
};
