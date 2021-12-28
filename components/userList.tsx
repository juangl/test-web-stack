import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import styles from "../styles/userList.module.css";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";

export const ALL_USERS_QUERY = gql`
  ${USER_DATA_FIELDS}
  query users($first: Int!, $after: ID, $name: String) {
    users(first: $first, after: $after, name: $name) {
      ...useDataFields
    }
  }
`;

export interface UserPayload {
  id: string;
  createdAt: string;
  avatarUrl: string;
  name: string;
  description: string;
  address: string;
}

export function UserList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_USERS_QUERY,
    {
      variables: {
        first: 6,
      },
    },
  );

  if (!data.users) {
    return null;
  }

  return (
    <div className={styles.userListContainer}>
      <div className={styles.userListGrid}>
        {data.users.map((user) => (
          <UserCard data={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
