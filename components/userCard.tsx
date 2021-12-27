import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import EditIcon from "./editIcon";
import styles from "../styles/userCard.module.css";
import { useButton } from "@react-aria/button";

interface UserCardProps {
  data: {
    createdAt: string;
    avatarUrl: string;
    name: string;
    description: string;
  };
}
export function UserCard(props: UserCardProps) {
  const dataObj = new Date(Number(props.data.createdAt));
  const formattedCreatedAt = format(dataObj, "dd MMM yyyy");

  const containerRef = React.useRef<HTMLDivElement>();
  let { buttonProps } = useButton({
    ...props,
    elementType: 'div'
  }, containerRef);

  return (
    <div className={styles.card} {...buttonProps} ref={containerRef}>
      <EditIcon className={styles.editIcon} />
      <div className={styles.avatarContainer}>
        <Image
          src={props.data.avatarUrl}
          alt={props.data.name}
          width={168}
          height={168}
        />
      </div>
      <div className={styles.cardTitleContainer}>
        <h2>{props.data.name}</h2>
        <div className={styles.createdAt}>
          Created <span>{formattedCreatedAt}</span>
        </div>
      </div>
      <div className={styles.description}>{props.data.description}</div>
    </div>
  );
}
