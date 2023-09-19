import { Box } from "@chakra-ui/react";
import { useComboBox } from "./Provider";

export const ListBox = () => {
  const { menuId, options } = useComboBox();
  return (
    <Box role="listbox" id={menuId}>
      {options.map((op) => null)}
    </Box>
  );
};
