import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type ComboBoxContext = {
  selected: string;
  isMenuOpen: boolean;
  menuId: string;
  onMenuClose: () => void;
  onMenuOpen: () => void;
  dispatch: Dispatch<SetStateAction<ComboBoxState>>;
  options: Option[];
};
export type Option = { label: string; value: string };
export type ComboBoxState = Omit<
  ComboBoxContext,
  "dispatch" | "onMenuOpen" | "onMenuClose" | "menuId"
>;

export const comboBoxDefaultState: ComboBoxContext = {
  menuId: "",
  isMenuOpen: false,
  onMenuClose: () => {},
  onMenuOpen: () => {},
  selected: "",
  options: [],
  dispatch: () => {},
};

const context = createContext<ComboBoxContext>({
  ...comboBoxDefaultState,
  dispatch: () => {},
});

export const ComboBoxProvider = context.Provider;

export function useComboBox() {
  return useContext(context);
}
