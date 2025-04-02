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
  }, []);

  // Obter tipos únicos para as abas
  const tabTypes = [...new Set(items.map((item) => item.type))];

  // Filtrar itens pela aba ativa
  const filteredItems = items.filter((item) => item.type === activeTab);

  // Função para renderizar o skeleton loading
  const renderSkeleton = () => {
    return (
      <View className="w-full p-4 space-y-4">
        {/* Skeleton para os tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </View>
        </ScrollView>

        {/* Skeleton para a tabela */}
        <View className="space-y-2">
          {/* Cabeçalho */}
          <View className="flex-row justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </View>

          {/* Linhas */}
          {[1, 2, 3, 4, 5].map((row) => (
            <View key={row} className="flex-row justify-between py-3">
              {[1, 2, 3, 4, 5].map((cell) => (
                <Skeleton key={cell} className="h-5 w-16" />
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="w-full h-4/5 m-2 gap-y-3 items-center">
      <View className="flex flex-row w-11/12 justify-start items-start p-2">
        <Text className="font-bold text-2xl">Histórico</Text>
      </View>

      {loading ? (
        renderSkeleton()
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-11/12 justify-center items-center shadow-xl shadow-border"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom:0,
            }}
          >
            <View className="m-0 p-0">
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
            <TabsContent key={type} value={type} className="w-full mt-0 pt-0 m-[-100px]">
              <Table className="h-4/5 shadow shadow-border">
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Text>Item</Text>
                    </TableHead>
                    <TableHead>
                      <Text>Pagamento</Text>
                    </TableHead>
                    <TableHead>
                      <Text>Data</Text>
                    </TableHead>
                    <TableHead>
                      <Text>Valor</Text>
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
                        <TableRow key={index}>
                          <TableCell>
                            <Text>{item.item}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{item.payment}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{new Date(item.data).toLocaleString()}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{item.value.toFixed(2)}</Text>
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
