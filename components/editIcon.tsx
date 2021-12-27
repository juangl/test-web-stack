import * as React from "react";
import { SVGProps } from "react";

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.595 11.758a.99.99 0 0 0-.39.455l-2.121 4.95c-.356.83.483 1.668 1.313 1.313l4.95-2.122a.99.99 0 0 0 .455-.39c.074-.05.145-.11.212-.175l7.778-7.779 1.414-1.414 1.768-1.768a2 2 0 0 0 0-2.828L16.559.586a2 2 0 0 0-2.828 0l-10.96 10.96a1.5 1.5 0 0 0-.176.212Zm1.944.849 1.414 1.414 7.424-7.425-1.414-1.414-7.424 7.425Zm12.02-9.193-1.767 1.768-1.415-1.414L15.146 2l1.414 1.414ZM3.462 14.358l-.555 1.294 1.294-.554-.74-.74Z"
        fill="#000"
        fillOpacity={0.4}
      />
    </svg>
  );
}

export default EditIcon;
