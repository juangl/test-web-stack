import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import styles from "../styles/userList.module.css";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
export const ALL_USERS_QUERY = gql`
  query users($first: Int!, $after: ID, $name: String) {
    users(first: $first, after: $after, name: $name) {
      id
      createdAt
      name
      address
      description
      avatarUrl
    }
  }
`;

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
