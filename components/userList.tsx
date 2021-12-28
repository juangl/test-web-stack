import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import styles from "../styles/userList.module.css";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";
import { useRouter } from "next/router";

export const ALL_USERS_QUERY = gql`
  ${USER_DATA_FIELDS}
  query users($first: Int!, $after: ID, $name: String) {
    users(first: $first, after: $after, name: $name) {
      edges {
        node {
          ...useDataFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
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
    after: data.users.pageInfo.endCursor,
  };
}

export function UserList() {
  const router = useRouter();
  const currentPage = router.query.page ? Number(router.query.page) : 1;
  const { loading, error, data, fetchMore } = useQuery(ALL_USERS_QUERY, {
    variables: getInitialPaginationVariables(currentPage),
  });

  if (loading && !data) {
    return null;
  }

  const userNodes = data.users.edges.map((edge) => edge.node);
  return (
    <div className={styles.userListContainer}>
      <div className={styles.userListGrid}>
        {userNodes.map((user) => (
          <UserCard data={user} key={user.id} />
        ))}
      </div>
      <div className={styles.userListFooter}>
        {data.users.pageInfo.hasNextPage && (
          <button
            className="primary"
            onClick={() => {
              router.push(`/?page=${currentPage + 1}`, undefined, {
                shallow: true,
              });
              fetchMore({
                variables: getFetchMoreVariables(data),
              });
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
