import { CircleFadingPlus, Cog, Home, List } from "lucide-react-native";
import { View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "./button";
import { useRouter, usePathname, RelativePathString } from "expo-router";
import { useState, useEffect } from "react";

export const MenuBar = () => {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const [currentScreen, setCurrentScreen] = useState<string>("");

  useEffect(() => {
    setCurrentScreen(pathname);
  }, [pathname]);

  const handleNavigation = (screen: string) => {
    const screenName = screen as RelativePathString;
    router.push(screenName);
  };

  const getButtonStyle = (screen: string) => {
    const isActive = currentScreen === screen;
    return {
      opacity: isActive ? 1 : 0.5,
      transform: isActive ? [{ scale: 1.2 }] : [{ scale: 1 }],
      transition: "transform 0.2s ease-in-out",
      
    };
  };

  return (
    <View className="absolute bottom-0 flex-row justify-between items-center w-full h-[10%] py-3 bg-background shadow-xl shadow-black">
      <View className="flex-1 items-center">
        <Button
          variant="ghost"
          onPress={() => handleNavigation("/screens/home")}
          style={getButtonStyle("/screens/home")}
        >
          <Home color={isDarkColorScheme ? "#fff" : "#000"} />
        </Button>
      </View>
      <View className="flex-1 items-center">
        <Button
          variant="ghost"
          onPress={() => handleNavigation("/screens/add-item")}
          style={getButtonStyle("/screens/add-item")}
        >
          <CircleFadingPlus color={isDarkColorScheme ? "#fff" : "#000"} />
        </Button>
      </View>
      <View className="flex-1 items-center">
        <Button
          variant="ghost"
          onPress={() => handleNavigation("/screens/list-item")}
          style={getButtonStyle("/screens/list-item")}
        >
          <List color={isDarkColorScheme ? "#fff" : "#000"} />
        </Button>
      </View>
      <View className="flex-1 items-center">
        <Button
          variant="ghost"
          onPress={() => handleNavigation("/screens/settings")}
          style={getButtonStyle("/screens/settings")}
        >
          <Cog color={isDarkColorScheme ? "#fff" : "#000"} />
        </Button>
      </View>
    </View>
  );
};
