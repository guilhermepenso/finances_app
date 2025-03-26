import React, { useEffect } from "react";
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "../text";
import { PieChart } from "react-native-gifted-charts";

export const Resume: React.FC = () => {
  const data = [
    { type: "Entretenimento", value: 150.42 },
    { type: "Estudos", value: 55.32 },
    { type: "Boletos", value: 400.17 },
    { type: "Empréstimos", value: 192.17 },
  ];

  useEffect(() => {}, [data]);

  return (
    <Card className="w-11/12">
      <CardContent className="native:p-1">
        <View className="flex flex-row items-center justify-between p-2">
          <Card>
            <CardContent className="native:p-2 min-w-[65%]">
              <View className="flex flex-col content-between justify-center">
                {data.map((item: any) => (
                  <View
                    key={item.type}
                    className="flex flex-row justify-between"
                  >
                    <Text>{item.type}</Text>
                    <Text>R$ {item.value}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
          <PieChart radius={50} data={data} />
        </View>
      </CardContent>
    </Card>
  );
};
