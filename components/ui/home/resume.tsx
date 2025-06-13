import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Card, CardContent } from "~/components/ui/card";
import { openDatabase } from "~/services/db/db";
import { getFinancesByMonth } from "~/services/db/finances";
import { iItemFinances, iPieChartGraphData } from "~/types/graph";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { Text } from "../text";

interface ResumeProps {
  month: string;
}

export const Resume: React.FC<ResumeProps> = ({ month }) => {
  const [pieChartData, setPieChartData] = useState<iPieChartGraphData[] | null>(
    null
  );

  useEffect(() => {
    const getFinancesDataByMonth = async (monthProp: string) => {
      const db = await openDatabase("finances.db");
      const [month, year] = monthProp.split("/");
      const data: iItemFinances[] = await getFinancesByMonth(db, Number(month), Number(year));
      if (data) {
        const filteredData = filterDataByType(data);
        const chartData = filteredData.map((item, index) => ({
          ...item,
          color: getColor(index),
        }));
        setPieChartData(chartData);
      }
    };
    getFinancesDataByMonth(month);
  }, [month]);

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

  

  return (
    <View className="flex w-full h-[25%] justify-center items-center">
      <Card className="w-11/12 shadow shadow-border">
        <CardContent className="native:p-1">
          {pieChartData ? (
            pieChartData.length === 0 ? (
              <View className="flex flex-row items-center justify-center p-2 w-full h-44">
                <Text className="text-lg text-muted-foreground text-center w-full">
                  Nenhum dado encontrado para este mês.
                </Text>
              </View>
            ) : (
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
            )
          ) : (
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-col content-between items-center gap-y-2 justify-center w-[60%] h-44 p-2">
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
    </View>
  );
};
