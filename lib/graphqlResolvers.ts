import { getRandomAvatar } from "./unsplash";
import dynamoDb from "./dynamoDb";

const DEFAULT_PAGE_SIZE = 20;

export const Query = {
  async users(parent, args) {
    let filters = {};
    if (args.name) {
      // add the "filter by name" expression by mutating the filter object
      Object.assign(filters, {
        FilterExpression: "contains(searchField, :searchField)",
        ExpressionAttributeValues: {
          ":searchField": args.name.toLowerCase(),
        },
      });
    }

    if (args.after) {
      // add the offset by mutating the filter object
      Object.assign(filters, {
        ExclusiveStartKey: { id: args.after },
      })
    }

    const { Items, LastEvaluatedKey } = await dynamoDb.scan({
      Limit: args.first || DEFAULT_PAGE_SIZE,
      ...filters,
    });

    return {
      edges: Items.map((item) => ({ node: item, cursor: item.id })),
      pageInfo: {
        endCursor: Items.length > 0 ? Items[Items.length - 1].id : null,
        hasNextPage: Items.length === args.first && !!LastEvaluatedKey,
      },
    };
  },
};

export const Mutation = {
  async createUser(parent, args) {
    const avatar = await getRandomAvatar();
    const uuid = require("uuid");
    const user = {
      id: uuid.v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      avatarUrl: avatar.urls.small,
      searchField: args.name.toLowerCase(),
      ...args,
    };

    await dynamoDb.put({
      Item: user,
    });

    return user;
  },

  async updateUser(parent, args) {
    const { Attributes } = await dynamoDb.update({
      Key: {
        id: args.id,
      },
      UpdateExpression:
        "SET #n = :name, address = :address, description = :description, updatedAt = :updatedAt, searchField = :searchField",
      ExpressionAttributeValues: {
        ":name": args.name,
        ":address": args.address,
        ":description": args.description,
        ":searchField": args.name.toLowerCase(),
        ":updatedAt": Date.now(),
      },
      ExpressionAttributeNames: {
        // required since `name` is a reserved word in DynamoDB
        "#n": "name",
      },
      ReturnValues: "ALL_NEW",
    });

    return Attributes;
  },
};
