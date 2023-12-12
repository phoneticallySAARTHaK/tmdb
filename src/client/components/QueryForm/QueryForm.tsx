import { As } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { Form, useFetcher, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { debounce } from "../../utils";
import { Combobox, ComboboxProps } from "../ComboBox/ComboBox";
import { Field } from "../ComboBox/Field";
import { ListBox } from "../ComboBox/ListBox";
import { Option } from "../ComboBox/Option";

export function QueryForm<T extends As>(
  props: Omit<ComboboxProps<T>, "children">
) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const data = fetcher.data as api.SearchResponse;

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    debounce(() => fetcher.submit(e.target.form), 250)();
  };

  return (
    <Combobox w="90vw" maxW="30rem" as={Form} action="/search" {...props}>
      <Field
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        autoCapitalize="off"
        autoFocus
        aria-label="Search"
        name="q"
        isLoading={fetcher.state !== "idle"}
        onChange={onChange}
        onKeyDown={(e) => {
          const id = (e.target as HTMLInputElement).getAttribute(
            "aria-activedescendant"
          );
          if (e.key === "Enter" && id) {
            id && navigate(`/movie/${id}`);
            e.preventDefault();
          }
        }}
      />
      <ListBox
        onPointerDown={(e) => {
          const op = (e.target as HTMLElement).closest("[role=option]");
          op?.id && navigate(`/movie/${op.id}`);
          e.preventDefault();
        }}
      >
        {data?.ok
          ? data.results.map((r) => (
              <Option
                key={r.id}
                value={`${r.id}`}
                date={r.release_date}
                label={r.title}
                path={r.poster_path}
              />
            ))
          : []}
      </ListBox>
    </Combobox>
  );
}
