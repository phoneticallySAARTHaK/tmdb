import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { utils } from "../../utils";
import { useComboBox } from "./Provider";

export type FieldProps = InputProps & { isLoading?: boolean };
export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ isLoading, onKeyDown, ...props }, ref) => {
    const { menuId, isMenuOpen, selected, dispatch } = useComboBox();

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    function handleOpen() {
      document.getElementById(menuId)?.childElementCount &&
        dispatch({ isMenuOpen: true });
    }
    function handleClose() {
      dispatch({ isMenuOpen: false, selected: "" });
    }
    function onClear() {
      props.value
        ? utils.dispatchSyntheticChangeEvent(innerRef.current!, "")
        : (innerRef.current!.value = "");
    }

    return (
      <InputGroup isolation={"initial"}>
        <Input
          bg="white"
          pr="6.25rem"
          color="black"
          mixBlendMode={"screen"}
          fontWeight={600}
          ref={innerRef}
          role="combobox"
          aria-controls={menuId}
          aria-autocomplete="list"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-activedescendant={selected}
          borderBottomLeftRadius={isMenuOpen ? 0 : undefined}
          borderBottomRightRadius={isMenuOpen ? 0 : undefined}
          _focus={{ border: "none", boxShadow: "none" }}
          onBlur={handleClose}
          onFocus={handleOpen}
          onMouseDown={() => {
            isMenuOpen ? handleClose() : handleOpen();
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            const menu = document.getElementById(menuId);

            switch (true) {
              case e.key === "Escape":
                isMenuOpen ? handleClose() : onClear();
                break;
              case e.altKey && e.key === "ArrowDown":
                handleOpen();
                break;
              case e.altKey && e.key === "ArrowUp":
                handleClose();
                break;

              case e.key === "Backspace" ||
                e.key === "Delete" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight":
                dispatch({ selected: "" });
                break;

              case e.key === "Home":
                const first = menu?.firstElementChild;
                first && dispatch({ selected: first.id });
                first?.scrollIntoView({ block: "start", behavior: "smooth" });
                break;

              case e.key === "End":
                const last = menu?.lastElementChild;
                last && dispatch({ selected: last.id });
                last?.scrollIntoView({ block: "start", behavior: "smooth" });
                break;

              case e.key === "ArrowDown":
                const next = selected
                  ? document.getElementById(selected)?.nextElementSibling
                  : menu?.firstElementChild;
                next && dispatch({ selected: next.id });
                next?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                e.preventDefault();
                break;

              case e.key === "ArrowUp":
                const prev =
                  document.getElementById(selected)?.previousElementSibling;
                prev && dispatch({ selected: prev.id });
                prev?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                e.preventDefault();
                break;
            }
          }}
          {...props}
        />
        <InputRightElement w="6rem" display={"flex"}>
          {isLoading ? <Spinner size={"sm"} pointerEvents="none" /> : null}

          <IconButton
            size={"sm"}
            icon={<CloseIcon />}
            aria-label="Clear"
            variant={"ghost"}
            title="clear"
            onClick={onClear}
            ml="auto"
            visibility={innerRef.current?.value ? "visible" : "hidden"}
          />

          <IconButton
            aria-label="Search"
            size={"sm"}
            icon={<SearchIcon />}
            mr="0.5rem"
            variant="ghost"
            type="submit"
          />
        </InputRightElement>
      </InputGroup>
    );
  }
);
