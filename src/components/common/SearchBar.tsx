import { FormElement, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState, KeyboardEvent } from "react";

const SearchBar = () => {
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
      labelPlaceholder="Search"
      animated={false}
    />
  );
};

export default SearchBar;
