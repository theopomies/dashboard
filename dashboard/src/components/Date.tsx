import { CalendarIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
      <Menu>
        <MenuButton color="brand.gray" _hover={{ color: "brand.darkGray" }}>
          <HStack>
            <HStack color="brand.gray">
              <CalendarIcon fontSize="1.5rem" />
              <Text fontWeight="500">Today</Text>
            </HStack>
            {["date", "both"].includes(display) ? (
              <Text fontWeight="600" color="brand.darkGray">
                {date.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            ) : null}
            {["time", "both"].includes(display) ? (
              <Text fontWeight="600" color="brand.darkGray">
                {date.toLocaleTimeString("en-gb", {})}
              </Text>
            ) : null}

            <ChevronDownIcon fontSize="1.5rem" />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setDisplay("none")}>
            <Text>
              None {display == "none" && <CheckIcon marginLeft=".5rem" />}
            </Text>
          </MenuItem>
          <MenuItem onClick={() => setDisplay("date")}>
            <Text>
              Date {display == "date" && <CheckIcon marginLeft=".5rem" />}
            </Text>
          </MenuItem>
          <MenuItem onClick={() => setDisplay("time")}>
            <Text>
              Time {display == "time" && <CheckIcon marginLeft=".5rem" />}
            </Text>
          </MenuItem>
          <MenuItem onClick={() => setDisplay("both")}>
            <Text>
              Date & Time{" "}
              {display == "both" && <CheckIcon marginLeft=".5rem" />}
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
