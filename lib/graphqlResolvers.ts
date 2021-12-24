import dynamoDb from "./dynamo-db";
import * as uuid from "uuid";
import { getRandomAvatar } from "./unsplash";

export const Query = {
  users(parent, args, context) {
    return [{ name: "Nextjs", username: "hi" }];
  },
};

export const Mutation = {
  async createUser(parent, args, context) {
    const avatar = await getRandomAvatar();
    const user = {
      id: uuid.v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      avatarUrl: avatar.urls.small,
      ...args,
    };

    await dynamoDb.put({
      Item: user,
    });

    return user;
  },

  async updateUser(parent, args, context) {
    const avatar = await getRandomAvatar();
    const user = {
      id: uuid.v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      avatarUrl: avatar.urls.small,
      ...args,
    };

    const { Attributes } = await dynamoDb.update({
      Key: {
        id: args.id,
      },
      UpdateExpression:
        "SET #n = :name, address = :address, description = :description, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":name": args.name,
        ":address": args.address,
        ":description": args.description,
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
