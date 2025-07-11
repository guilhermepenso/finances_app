import { View } from "react-native";
import { Text } from "@/ui/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { useState } from "react";

interface MonthPickerProps {
  month: string;
  setMonth: (month: string) => void;
}

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  setMonth,
}) => {
  const [selectedMonth, selectedYear] = month.split("/");
  const [year, setYear] = useState(
    () => Number(selectedYear) || new Date().getFullYear()
  );

  const handleMonthSelect = (m: string) => setMonth(`${m}/${year}`);

  return (
    <View className="flex w-full h-[5%] justify-start items-center">
      <View className="flex w-11/12 h-full justify-start items-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Text>{`${selectedMonth}/${year}`}</Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 native:w-72 items-center">
            <View className="flex-row items-center justify-between mb-2 w-full px-2">
              <Button variant="ghost" onPress={() => setYear((y) => y - 1)}>
                <Text>{"<"}</Text>
              </Button>
              <Text className="text-lg font-bold">{year}</Text>
              <Button variant="ghost" onPress={() => setYear((y) => y + 1)}>
                <Text>{">"}</Text>
              </Button>
            </View>
            <View className="flex flex-col gap-2">
              {[0, 1, 2].map((row) => (
                <View key={row} className="flex-row gap-2 justify-center">
                  {months.slice(row * 4, row * 4 + 4).map((m) => (
                    <Button
                      key={m}
                      variant={
                        selectedMonth === m && Number(selectedYear) === year
                          ? "outline"
                          : "ghost"
                      }
                      onPress={() => {
                        handleMonthSelect(m);
                      }}
                    >
                      <Text>{m}</Text>
                    </Button>
                  ))}
                </View>
              ))}
            </View>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
};
