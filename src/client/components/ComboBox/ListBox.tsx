import { ListProps, UnorderedList } from "@chakra-ui/react";
import { FC, ReactElement, useEffect } from "react";
import { useComboBox } from "./Provider";

export type ListBoxProps = Omit<ListProps, "children"> & {
  children: ReactElement[];
};

export const ListBox: FC<ListBoxProps> = (props) => {
  const { menuId, isMenuOpen, dispatch } = useComboBox();

  useEffect(() => {
    if (!props.children.length) dispatch({ isMenuOpen: false, selected: "" });
    else dispatch({ isMenuOpen: true, selected: "" });
  }, [props.children]);

  return (
    <UnorderedList
      visibility={isMenuOpen ? "visible" : "hidden"}
      role="listbox"
      id={menuId}
      position="absolute"
      top="95%"
      borderRadius="8px"
      backgroundColor="white"
      border="1px solid #eee"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      maxH="50vh"
      overflow="hidden auto"
      w="100%"
      m="0"
      zIndex={1}
      className="allow-scroll"
      {...props}
    />
  );
};
