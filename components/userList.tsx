import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import styles from "../styles/userList.module.css";
import { USER_DATA_FIELDS } from "../lib/graphqlUtils";
import { useRouter } from "next/router";
import React from "react";
import {
  getFetchMoreVariables,
  getInitialPaginationVariables,
} from "../lib/paginationUtils";

export const ALL_USERS_QUERY = gql`
  ${USER_DATA_FIELDS}
  query users($first: Int!, $after: ID, $name: String) {
    users(first: $first, after: $after, name: $name) {
      edges {
        node {
          ...useDataFields
        }
        cursor
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

interface UserListProps {
  search: string;
}

export function UserList(props: UserListProps) {
  const router = useRouter();
  const currentPage = Number(router.query.page || 1);
  const [initialPage] = React.useState(currentPage)

  // fetch data
  const { loading, data, fetchMore } = useQuery(ALL_USERS_QUERY, {
    variables: getInitialPaginationVariables(initialPage, props.search),
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  if (loading && !data) {
    return <span>loading...</span>;
  }

  const userNodes = data.users.edges.map((edge) => edge.node);

  if (!userNodes.length) {
    return <span>No users found :(</span>;
  }

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
              let searchParams = new URLSearchParams({
                page: String(currentPage + 1),
              });

              if (props.search) {
                searchParams.set("search", props.search);
              }

              router.push("/?" + searchParams.toString(), undefined, {
                shallow: true,
              });

              fetchMore({
                variables: getFetchMoreVariables(data, props.search),
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
