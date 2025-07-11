import { MoonStar, Sun } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Settings() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View>
      <View className="flex w-full h-full justify-center items-center">
        <View className="flex w-full h-[10%] justify-center items-center">
          <Text className="text-2xl font-bold mb-4">Configurações</Text>
        </View>
        <ScrollView className="flex w-11/12 mt-4">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-2 py-6">
              {isDarkColorScheme ? (
                <MoonStar color={isDarkColorScheme ? "white" : "black"} />
              ) : (
                <Sun color={isDarkColorScheme ? "white" : "black"} />
              )}
              <Text className="text-xl font-bold">Alterar Tema</Text>
            </View>
            <Switch
              checked={isDarkColorScheme}
              onCheckedChange={toggleColorScheme}
            />
          </View>

          <Separator />
        </ScrollView>
      </View>
    </View>
  );
}
