import React from "react";
import Portals from "./Portals";
import styles from "../styles/editModal.module.css";
import MapPreview from "./MapPreview";
import { UserPayload } from "./userList";
import EditUserInfoForm from "./editUserInfoForm";
import { gql, useMutation } from "@apollo/client";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";

// Define mutation
const INCREMENT_COUNTER = gql`
  ${USER_DATA_FIELDS}
  mutation (
    $id: ID!
    $name: String!
    $address: String!
    $description: String!
  ) {
    updateUser(id: $id, name: $name, address: $address, description: $description) {
      ...useDataFields
    }
  }
`;

interface EditModalProps {
  data: UserPayload;
  onRequestClose: () => void;
}

export default function EditModal(props: EditModalProps) {
  const [updateUser] = useMutation(INCREMENT_COUNTER);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Portals>
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
              onSubmit={(values) => {
                updateUser({ variables: {
                  id: props.data.id,
                  name: values.name,
                  address: values.address,
                  description: values.description,
                } }).then(() => {
                  props.onRequestClose();
                });
              }}
            />
          </div>
        </div>
      </div>
    </Portals>
  );
}
