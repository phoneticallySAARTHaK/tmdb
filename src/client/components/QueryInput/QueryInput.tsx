import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../api";
import { debounce } from "../../utils";

export type QueryInputProps = InputProps;

export const QueryInput: FC<QueryInputProps> = (props) => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  async function handleChange(q: string) {
    return api
      .search(q)
      .then((d) =>
        d.ok ? d.results.map((r) => ({ label: r.title, value: r.id })) : []
      );
  }

  const debounced = debounce(handleChange, 250);
  return <Input autoComplete="off" role="combobox" {...props} />;
};
