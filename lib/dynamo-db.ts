import aws from "aws-sdk";

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  params: {
    TableName: process.env.TABLE_NAME,
  },
});

// utility type to exclude `TableName` from the payload since the TableName is assigned by default at the end moment the client is created
type DynamoDBAPICallParams<T extends (...args: any) => any> = Omit<
  Parameters<T>[0],
  "TableName"
>;

const API = {
  get: (params: DynamoDBAPICallParams<typeof client.get>) =>
    client.get(params).promise(),
  put: (params: DynamoDBAPICallParams<typeof client.put>) =>
    client.put(params).promise(),
  query: (params: DynamoDBAPICallParams<typeof client.query>) =>
    client.query(params).promise(),
  update: (params: DynamoDBAPICallParams<typeof client.update>) =>
    client.update(params).promise(),
  delete: (params: DynamoDBAPICallParams<typeof client.delete>) =>
    client.delete(params).promise(),
};

export default API;
