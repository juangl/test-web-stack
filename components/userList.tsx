import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import styles from "../styles/userList.module.css";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";
import { useRouter } from "next/router";

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

const PAGE_SIZE = 6;
export function getInitialPaginationVariables(page: number = 1) {
  return {
    first: PAGE_SIZE * page,
  };
}

function getFetchMoreVariables(data) {
  return {
    first: PAGE_SIZE,
    after: data.users[data.users.length - 1].id,
  };
}

export function UserList() {
  const router = useRouter();

  const { loading, error, data, fetchMore } = useQuery(ALL_USERS_QUERY, {
    variables: getInitialPaginationVariables(Number(router.query.page)),
  });

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
      <button
        className="primary"
        onClick={() =>
          fetchMore({
            variables: getFetchMoreVariables(data),
          })
        }
      >
        Load More
      </button>
    </div>
  );
}
