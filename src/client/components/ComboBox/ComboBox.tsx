import { useDisclosure } from "@chakra-ui/react";
import { useId, useState } from "react";
import { ComboBoxProvider, ComboBoxState } from "./Provider";

export const Combobox = () => {
  const listboxId = useId();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [state, dispatch] = useState<ComboBoxState>({
    selected: "",
    isMenuOpen: isOpen,
    options: [],
  });

  return (
    <ComboBoxProvider
      value={{
        ...state,
        dispatch,
        onMenuClose: onClose,
        onMenuOpen: onOpen,
        menuId: listboxId,
      }}
    ></ComboBoxProvider>
  );
};
