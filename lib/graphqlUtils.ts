import { gql } from "@apollo/client";

export const USER_DATA_FIELDS = gql`
  fragment useDataFields on User {
    id
    createdAt
    name
    address
    description
    avatarUrl
  }
`;
