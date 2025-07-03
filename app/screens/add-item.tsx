import { SafeAreaView, View } from "react-native";
import { MenuBar } from "~/components/ui/menu-bar";

import { ItemForm } from "~/components/ui/add-item/item-form";

export default function AddItem() {

  return (
    <SafeAreaView className="flex-1 bg-background mt-16">
      <View className="flex h-[90%]">
        <ItemForm />
      </View>
      <MenuBar />
    </SafeAreaView>
  );
}
