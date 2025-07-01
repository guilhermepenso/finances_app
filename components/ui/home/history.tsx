import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { openDatabase } from "~/services/db/db";
import { getFinancesByMonth } from "~/services/db/finances";
import { iItemFinances } from "~/types/graph";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Text } from "../text";

interface HistoryProps {
  month: string;
}

export const History: React.FC<HistoryProps> = ({ month }) => {
  const [items, setItems] = useState<iItemFinances[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const getFinancesDataByMonth = async (monthProp: string) => {
      const db = await openDatabase("finances.db");
      const [month, year] = monthProp.split("/");
      const data: iItemFinances[] = await getFinancesByMonth(
        db,
        Number(month),
        Number(year)
      );
      if (data) {
        console.log('data: ', data);
        setItems(data);
        setLoading(false);
        if (data.length > 0) {
          setActiveTab(data[0].type);
        }
      }
    };
    getFinancesDataByMonth(month);
  }, [month]);

  const tabTypes = [...new Set(items.map((item) => item.type))];

  const filteredItems = items.filter((item) => item.type === activeTab);

  return (
    <View className="w-full h-[72.5%] gap-y-3 justify-start items-center">
      <View className="flex flex-row w-11/12 justify-start items-start p-2">
        <Text className="font-bold text-2xl">Histórico</Text>
      </View>

      {loading ? (
        <View className="w-11/12 h-[85%] justify-center item-center gap-y-1 px-1 border border-border rounded-md">
          <Skeleton className="h-[6.5%] w-full rounded-md" />
          <Skeleton className="h-[91.5%] w-full rounded-md" />
        </View>
      ) : items.length === 0 ? (
        <View className="w-11/12 h-[85%] justify-center items-center border border-border rounded-md">
          <Text className="text-lg text-muted-foreground text-center">
            Nenhum dado encontrado para este mês.
          </Text>
        </View>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-11/12 h-[85%] justify-start items-center border border-border rounded-md"
        >
          <View className="w-full h-[15%] sm:mb-[-4%] md:mb-[-8%]">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 0,
              }}
            >
              <TabsList className="flex flex-row h-full w-full bg-primary-foreground">
                {tabTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>
                    <Text>{type}</Text>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollView>
          </View>

          <View className="w-full h-[85%]">
            {tabTypes.map((type) => (
              <TabsContent key={type} value={type} className="w-full h-full">
                {filteredItems.length === 0 ? (
                  <View className="flex-1 justify-center items-center h-full">
                    <Text className="text-lg text-muted-foreground text-center">
                      Nenhum dado encontrado para este tipo neste mês.
                    </Text>
                  </View>
                ) : (
                  <Table className="sm:h-[105%] md:h-[108%]">
                    <TableHeader>
                      <TableRow className="flex-row justify-evenly items-center">
                        <TableHead className="w-[30%] justify-center items-center px-0">
                          <Text className="font-bold">Item</Text>
                        </TableHead>
                        <Separator className="h-[85%]" orientation="vertical" />
                        <TableHead className="w-[17.5%] justify-center items-center px-0">
                          <Text className="font-bold">Método</Text>
                        </TableHead>
                        <Separator className="h-[85%]" orientation="vertical" />
                        <TableHead className="w-[30%] justify-center items-center px-0">
                          <Text className="font-bold">Data</Text>
                        </TableHead>
                        <Separator className="h-[85%]" orientation="vertical" />
                        <TableHead className="w-[22.5%] justify-center items-center px-0">
                          <Text className="font-bold">Valor</Text>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <ScrollView>
                        {filteredItems
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                          )
                          .map((item, index) => (
                            <TableRow
                              className="flex flex-row justify-evenly items-center"
                              key={index}
                            >
                              <TableCell className="w-[30%] items-center px-0">
                                <Text>{item.item}</Text>
                              </TableCell>
                              <Separator orientation="vertical" />
                              <TableCell className="w-[17.5%] items-center px-0">
                                <Text>{item.payment}</Text>
                              </TableCell>
                              <Separator orientation="vertical" />
                              <TableCell className="w-[30%] items-center px-0">
                                <Text>
                                  {new Date(item.date).toLocaleString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Text>
                              </TableCell>
                              <Separator orientation="vertical" />
                              <TableCell className="w-[22.5%] items-center px-0">
                                <Text>
                                  {item.value.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    maximumFractionDigits: 2,
                                  })}
                                </Text>
                              </TableCell>
                            </TableRow>
                          ))}
                      </ScrollView>
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            ))}
          </View>
        </Tabs>
      )}
    </View>
  );
};
