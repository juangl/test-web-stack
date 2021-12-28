import React from "react";
import styles from "../styles/editUserInfoModal.module.css";
import MapPreview from "./MapPreview";
import { UserPayload } from "./userList";
import EditUserInfoForm from "./editUserInfoForm";
import { gql, useMutation } from "@apollo/client";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";

// Define mutation
const INCREMENT_COUNTER = gql`
  ${USER_DATA_FIELDS}
  mutation updateUser(
    $id: ID!
    $name: String!
    $address: String!
    $description: String!
  ) {
    updateUser(
      id: $id
      name: $name
      address: $address
      description: $description
    ) {
      ...useDataFields
    }
  }
`;

export interface EditUserInfoModalProps {
  data: UserPayload;
  onRequestClose: () => void;
}

export default function EditUserModal(props: EditUserInfoModalProps) {
  const [updateUser] = useMutation(INCREMENT_COUNTER);

  return (
    <div className={styles.editModalContainer}>
      <div className={styles.backdrop} onClick={props.onRequestClose} />
      <div className={styles.modal}>
        <h1>Edit user</h1>
        <div className={styles.editModalContent}>
          <div>
            <MapPreview address={props.data.address} />
          </div>
          <EditUserInfoForm
            initialData={props.data}
            onCancel={props.onRequestClose}
            onSubmit={async (values) => {
              await updateUser({
                variables: {
                  id: props.data.id,
                  name: values.name,
                  address: values.address,
                  description: values.description,
                },
              });
              props.onRequestClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
