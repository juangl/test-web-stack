import React from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

interface SearchInputProps {
  initialSearch: string;
}

export default function SearchInput(props: SearchInputProps) {
  const { push } = useRouter();

  const debouncedNavigateToSearchRef = React.useRef<(search: string) => void>();
  React.useEffect(() => {
    debouncedNavigateToSearchRef.current = debounce((search: string) => {
      const url = search ? `/?search=${search}` : "/";
      push(url, undefined, {
        shallow: true,
      });
    }, 1000);
  }, [push]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        placeholder="Search..."
        defaultValue={props.initialSearch}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const search = e.currentTarget.value;
          debouncedNavigateToSearchRef.current(search);
        }}
      />
    </form>
  );
}
