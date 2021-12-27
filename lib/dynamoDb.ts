import type aws from "aws-sdk";

let client: aws.DynamoDB.DocumentClient = null;

// lazily initialize `client`
function getApiClient() {
  if (!client) {
    const aws = require("aws-sdk");
    client = new aws.DynamoDB.DocumentClient({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
    });
  }

  return client;
}

// utility type extract the API function param types and make the field `TableName` optional
type DynamoDBAPICallParams<T extends (...args: any) => any> = Omit<
  Parameters<T>[0],
  "TableName"
> & { TableName?: string };

// helper to assign TableName with a default value
const prepareDynamoDBParams = <T>(params: T) => ({
  TableName: process.env.TABLE_NAME,
  ...params,
});

const API = {
  get: (params: DynamoDBAPICallParams<typeof client.get>) =>
    getApiClient().get(prepareDynamoDBParams(params)).promise(),
  put: (params: DynamoDBAPICallParams<typeof client.put>) =>
    getApiClient().put(prepareDynamoDBParams(params)).promise(),
  query: (params: DynamoDBAPICallParams<typeof client.query>) =>
    getApiClient().query(prepareDynamoDBParams(params)).promise(),
  scan: (params: DynamoDBAPICallParams<typeof client.scan>) =>
    getApiClient().scan(prepareDynamoDBParams(params)).promise(),
  update: (params: DynamoDBAPICallParams<typeof client.update>) =>
    getApiClient().update(prepareDynamoDBParams(params)).promise(),
  delete: (params: DynamoDBAPICallParams<typeof client.delete>) =>
    getApiClient().delete(prepareDynamoDBParams(params)).promise(),
};

export default API;
