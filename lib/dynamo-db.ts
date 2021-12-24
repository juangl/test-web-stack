import aws from "aws-sdk";

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

// utility type extract the API call param types and make `TableName` optional
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
    client.get(prepareDynamoDBParams(params)).promise(),
  put: (params: DynamoDBAPICallParams<typeof client.put>) =>
    client.put(prepareDynamoDBParams(params)).promise(),
  query: (params: DynamoDBAPICallParams<typeof client.query>) =>
    client.query(prepareDynamoDBParams(params)).promise(),
  update: (params: DynamoDBAPICallParams<typeof client.update>) =>
    client.update(prepareDynamoDBParams(params)).promise(),
  delete: (params: DynamoDBAPICallParams<typeof client.delete>) =>
    client.delete(prepareDynamoDBParams(params)).promise(),
};

export default API;
