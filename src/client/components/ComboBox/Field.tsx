import { Input } from "@chakra-ui/react";
import { useComboBox } from "./Provider";

export const ComboBoxField = () => {
  const { menuId, isMenuOpen } = useComboBox();
  return (
    <Input
      role="combobox"
      aria-controls={menuId}
      aria-autocomplete="both"
      aria-expanded={isMenuOpen ? "true" : "false"}
    />
  );
};
