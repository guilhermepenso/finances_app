import { View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Text } from "../text";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../table";
import data from "../../../services/db/data.json";
import { iItemFinances } from "~/types/graph";
import { Skeleton } from "../skeleton";
import { Separator } from "../separator";

export const History: React.FC = () => {
  const [items, setItems] = useState<iItemFinances[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setItems(data);
      setLoading(false);
      // Define a primeira aba como ativa após carregar os dados
      if (data.length > 0) {
        setActiveTab(data[0].type);
      }
    }, 2000);
  }, [data]);

  const tabTypes = [...new Set(items.map((item) => item.type))];

  const filteredItems = items.filter((item) => item.type === activeTab);

  return (
    <View className="w-full h-4/5 m-2 gap-y-3 items-center">
      <View className="flex flex-row w-11/12 justify-start items-start p-2">
        <Text className="font-bold text-2xl">Histórico</Text>
      </View>

      {loading ? (
        <View className="w-11/12 item-center gap-y-3 border border-border rounded-md">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-4/5 w-full" />
        </View>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-11/12 justify-center items-center border border-border rounded-md"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
            }}
          >
            <View className="m-0 p-0 h-2/12">
              <TabsList className="flex flex-row w-full">
                {tabTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>
                    <Text>{type}</Text>
                  </TabsTrigger>
                ))}
              </TabsList>
            </View>
          </ScrollView>

          {/* Conteúdo das abas */}
          {tabTypes.map((type) => (
            <TabsContent
              key={type}
              value={type}
              className="w-full h-10/12 pt-0 mt-[-22.5%]"
            >
              <Table className="h-4/5">
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
                          new Date(b.data).getTime() -
                          new Date(a.data).getTime()
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
                              {new Date(item.data).toLocaleString("pt-BR", {
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
            </TabsContent>
          ))}
        </Tabs>
      )}
    </View>
  );
};
