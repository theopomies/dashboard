import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useEffect, useState } from "react";

export function DateDisplayer() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [display, setDisplay] = useState<"none" | "date" | "time" | "both">(
    "date"
  );

  return (
    <HStack>
      <HStack color="brand.gray">
        <CalendarIcon fontSize="1.5rem" />
        <Text fontWeight="500">Today</Text>
      </HStack>
      {["date", "both"].includes(display) ? (
        <Text fontWeight="600">
          {date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      ) : null}
      {["time", "both"].includes(display) ? (
        <Text fontWeight="600">{date.toLocaleTimeString("en-gb", {})}</Text>
      ) : null}
      <Menu>
        <MenuButton>
          <ChevronDownIcon fontSize="1.5rem" color="brand.gray" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setDisplay("none")}>None</MenuItem>
          <MenuItem onClick={() => setDisplay("date")}>Date</MenuItem>
          <MenuItem onClick={() => setDisplay("time")}>Time</MenuItem>
          <MenuItem onClick={() => setDisplay("both")}>Both</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
