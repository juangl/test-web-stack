import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    users(first: Int, offset: Int): [User!]!
  }

  type Mutation {
    createUser(
      name: String!
      address: String!
      description: String!
    ): User!

    updateUser(
      id: ID!
      name: String!
      address: String!
      description: String!
    ): User!
  }

  type User {
    id: ID!
    name: String!
    address: String!
    description: String!
    avatarUrl: String!
    createdAt: String!
    updatedAt: String!
  }
`;
