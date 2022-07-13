import { Input } from "@nextui-org/react";

type SearchProps = {
  query: string;
  queryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = (props: SearchProps) => {
  return (
    <Input id="search-bar" clearable size="lg" rounded placeholder="Search" initialValue={props.query} aria-label = "Search" />
  );
};

export default SearchBar;
