import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "../text";
import { PieChart } from "react-native-gifted-charts";
import { iPieChartGraphData } from "~/types/graph";
import { Skeleton } from "../skeleton";
import { Separator } from "../separator";

export const Resume: React.FC = () => {
  const [pieChartData, setPieChartData] = useState<iPieChartGraphData[] | null>(
    null
  );

  const data = [
    { type: "Entretenimento", value: 150.42 },
    { type: "Estudos", value: 55.32 },
    { type: "Boletos", value: 400.17 },
    { type: "Empréstimos", value: 192.17 },
  ];

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setPieChartData(data);
      }, 2000);
    }
  }, []);

  return (
    <Card className="w-11/12 shadow shadow-border">
      <CardContent className="native:p-1">
        {pieChartData ? (
          <View className="flex flex-row items-center justify-between p-2">
            <View className="p-2 min-w-[60%]">
              <View className="flex flex-col content-between justify-center">
                {data.map((item: any) => (
                  <View
                    key={item.type}
                    className="flex flex-row justify-between items-center"
                  >
                    <View className="justify-start">
                      <Text className="text-muted-foreground">{item.type}</Text>
                    </View>
                    <View className="justify-start">
                      <Text className="font-bold">R$ {item.value}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Separator orientation="vertical" />
            <PieChart radius={50} data={pieChartData} />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between p-2">
            <View className="flex flex-col content-between items-center gap-y-2 justify-center w-[60%] h-24 p-2">
              <Skeleton className="w-11/12 h-3.5" />
              <Skeleton className="w-11/12 h-3.5" />
              <Skeleton className="w-11/12 h-3.5" />
              <Skeleton className="w-11/12 h-3.5" />
            </View>
            <Separator orientation="vertical" />
            <Skeleton className="w-28 h-28 rounded-full" />
          </View>
        )}
      </CardContent>
    </Card>
  );
};
