import { Flex, Image, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { getPosterUrl } from "../../utils";
import { ComboBoxOption, useComboBox } from "./Provider";

export type OptionProps = ComboBoxOption;

export const Option: FC<ComboBoxOption> = ({ label, value, path, date }) => {
  const { selected } = useComboBox();
  return (
    <Link
      as="li"
      value={value}
      id={value}
      aria-selected={selected === value ? "true" : "false"}
      display="flex"
      w="100%"
      gap={2}
      borderBottom={"1px solid #eee"}
      p={2}
      role="option"
      fontSize={"1rem"}
      _selected={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      _hover={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Image
        src={getPosterUrl(path ?? "", 92)}
        height={"3rem"}
        aspectRatio={"1"}
        objectFit={"cover"}
        fallbackSrc="https://via.placeholder.com/60"
      />
      <Flex direction="column" flex="1 1 50%" minW="0">
        <Text
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          minW="0"
        >
          {label}
        </Text>

        <Text as="time" dateTime={date.slice(0, 4)} fontSize={"80%"}>
          {date.slice(0, 4)}
        </Text>
      </Flex>
    </Link>
  );
};
