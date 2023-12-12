import { As, Box, HTMLChakraProps } from "@chakra-ui/react";
import { ReactNode, useId, useReducer } from "react";
import { ComboBoxProvider, ComboBoxState } from "./Provider";

export type ComboboxProps<T extends As> = {
  children: ReactNode;
} & HTMLChakraProps<T>;

export function Combobox<T extends As>({
  children,

  ...props
}: ComboboxProps<T>) {
  const listboxId = useId();

  const [state, dispatch] = useReducer<
    (state: ComboBoxState, action: Partial<ComboBoxState>) => ComboBoxState
  >((state, action) => ({ ...state, ...action }), {
    selected: "",
    isMenuOpen: false,
  });

  return (
    <ComboBoxProvider
      value={{
        ...state,
        dispatch,
        menuId: listboxId,
      }}
      children={
        <Box position="relative" {...props}>
          {children}
        </Box>
      }
    />
  );
}
