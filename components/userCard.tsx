import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import EditIcon from "./editIcon";
import styles from "../styles/userCard.module.css";
import { useButton } from "@react-aria/button";
import { UserPayload } from "./userList";
import { AnimatedEditUserInfoModal } from "./animatedEditUserInfoModal";

interface UserCardProps {
  data: UserPayload;
}

export function UserCard(props: UserCardProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const dataObj = new Date(Number(props.data.createdAt));
  const formattedCreatedAt = format(dataObj, "dd MMM yyyy");

  const containerRef = React.useRef<HTMLDivElement>();
  // the container is not an actual button but a div not accessible by default,
  // so we make it accessible using this hook
  let { buttonProps } = useButton(
    {
      onPress: () => {
        setEditModalOpen(true);
      },
      elementType: "div",
    },
    containerRef,
  );

  return (
    <div className={styles.card} ref={containerRef} {...buttonProps}>
      <AnimatedEditUserInfoModal
        isOpen={editModalOpen}
        data={props.data}
        onRequestClose={() => {
          setEditModalOpen(false);
        }}
      />
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
