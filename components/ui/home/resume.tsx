import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "../text";
import { PieChart } from "react-native-gifted-charts";
import { iItemFinances, iPieChartGraphData } from "~/types/graph";
import { Skeleton } from "../skeleton";
import { Separator } from "../separator";
import data from "../../../services/db/data.json";

export const Resume: React.FC = () => {
  const [pieChartData, setPieChartData] = useState<iPieChartGraphData[] | null>(
    null
  );

  const pastelColors = [
    "#A8DADC",
    "#457B9D",
    "#F4A261",
    "#E76F51",
    "#2A9D8F",
    "#264653",
    "#E9C46A",
  ];

  const getColor = (index: number) => pastelColors[index % pastelColors.length];

  const filterDataByType = (data: iItemFinances[]): iPieChartGraphData[] => {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = 0;
      }
      acc[item.type] += item.value;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groupedData).map(([type, value]) => ({
      type,
      value,
    }));
  };

  useEffect(() => {
    if (data) {
      const filteredData = filterDataByType(data);
      const chartData = filteredData.map((item, index) => ({
        ...item,
        color: getColor(index),
      }));
      setTimeout(() => {
        setPieChartData(chartData);
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
                {pieChartData.map((item, index) => (
                  <View
                    key={item.type}
                    className="flex flex-row justify-between items-center"
                  >
                    <View className="justify-start">
                      <Text
                        className={`font-bold`}
                        style={{ color: getColor(index) }}
                      >
                        {item.type}
                      </Text>
                    </View>
                    <View className="justify-start">
                      <Text className="font-bold">
                        {item.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 2,
                        })}
                      </Text>
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
