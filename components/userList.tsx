import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query users($first: Int!, $after: ID, $name: String) {
    users(first: $first, after: $after, name: $name) {
      id
      name
      address
      description
      avatarUrl
    }
  }
`

export function UserList() {
  
}
