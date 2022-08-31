import { FormElement, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TbSearch } from "react-icons/tb";

interface SearchBarProps {
  status?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | undefined;
  bordered?: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onChange = (e: ChangeEvent<FormElement>) => {
    setQuery(e.currentTarget.value);
  };

  const onKeyDown = (e: KeyboardEvent<FormElement>) => {
    if (e.key === "Enter" && query) {
      router.push(
        {
          pathname: "/search/[prompt]/tracks",
          query: { prompt: query },
        },
        undefined,
        { shallow: false, scroll: true }
      );
    }
  };

  return (
    <Input
      type={"search"}
      size="xl"
      width="100%"
      onKeyDown={onKeyDown}
      onChange={onChange}
      placeholder="Search"
      animated={false}
      status={props.status || "default"}
      labelLeft={<TbSearch size={20} color={"#555555"} />}
      aria-label="Search"
      bordered={props.bordered}
      data-cy="searchBar"
    />
  );
};

export default SearchBar;
