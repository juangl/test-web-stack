import { getRandomAvatar } from "./unsplash";
import dynamoDb from "./dynamoDb";

const DEFAULT_PAGE_SIZE = 20;

export const Query = {
  async users(parent, args, context) {
    let filter = {};
    if (args.name) {
      // add filter by name mutating the filter object
      Object.assign(filter, {
        FilterExpression: "contains(searchField, :searchField)",
        ExpressionAttributeValues: {
          ":searchField": args.name.toLowerCase(),
        },
      });
    }

    const { Items } = await dynamoDb.scan({
      Limit: args.first || DEFAULT_PAGE_SIZE,
      ExclusiveStartKey: args.after && { id: args.after },
      ...filter,
    });

    return Items;
  },
};

export const Mutation = {
  async createUser(parent, args, context) {
    const avatar = await getRandomAvatar();
    const uuid = require('uuid');
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

  async updateUser(parent, args, context) {
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
