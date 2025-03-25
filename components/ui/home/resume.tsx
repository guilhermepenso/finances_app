import React from "react";
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "../text";
import { PieChart } from "react-native-gifted-charts";

export const Resume: React.FC = () => {
  const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

  return (
    <Card className="w-11/12">
      <CardContent>
        <View className="flex flex-row items-center justify-between p-2">
          <Card>
            <CardContent>
              <Text>Item 1</Text>
              <Text>Item 2</Text>
              <Text>Item 3</Text>
            </CardContent>
          </Card>
          <PieChart data={data}/>
        </View>
      </CardContent>
    </Card>
  );
};
