import React from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

interface SearchInputProps {
  initialSearch: string;
}

export default function SearchInput(props: SearchInputProps) {
  const router = useRouter();

  // in order to work property the debounced function need to be stored in a ref to preserved it across re-renders
  const debouncedNavigateToSearchRef = React.useRef(
    debounce((search: string) => {
      const url = search ? `/?search=${encodeURIComponent(search)}` : "/";
      router.push(url, undefined, {
        shallow: true,
      });
    }, 400),
  );

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
