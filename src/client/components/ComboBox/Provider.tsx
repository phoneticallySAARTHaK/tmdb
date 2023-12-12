import { Dispatch, createContext, useContext } from "react";

export type ComboBoxContext = {
  selected: string;
  isMenuOpen: boolean;
  menuId: string;
  dispatch: Dispatch<Partial<ComboBoxState>>;
  // options: ComboBoxOption[];
  // isLoading: boolean;
};

export type ComboBoxOption = {
  label: string;
  value: string;
  path?: string | null;
  date: string;
};

export type ComboBoxState = Omit<ComboBoxContext, "dispatch" | "menuId">;

export const comboBoxDefaultState: ComboBoxContext = {
  menuId: "",
  isMenuOpen: false,
  selected: "",
  // options: [],
  // isLoading: false,
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
