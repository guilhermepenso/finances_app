import { Tabs } from "expo-router";
import { CircleFadingPlus, Cog, Home, List } from "lucide-react-native";
import { SafeAreaView } from "react-native";

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "fade",
          tabBarStyle: {
            height: 80, // Aumenta a altura total da barra
            paddingBottom: 20, // Adiciona padding na parte inferior para dar mais espaço
            paddingTop: 10, // Adiciona padding no topo
          },
          tabBarItemStyle: {
            // Ajuste opcional para o estilo de cada item
            margin: 5, // Por exemplo, aumenta a margem dos itens
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Home color={color} />,
          }}
        />
        <Tabs.Screen
          name="add-item"
          options={{
            tabBarLabel: "Add Item",
            tabBarIcon: ({ color }) => <CircleFadingPlus color={color} />,
          }}
        />
        <Tabs.Screen
          name="list-item"
          options={{
            tabBarLabel: "Items",
            tabBarIcon: ({ color }) => <List color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => <Cog color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
