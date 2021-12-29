https://user-images.githubusercontent.com/1887029/147615987-59cca91b-ea6f-4b3f-a552-cd94b8211506.mp4

Live Version: Live Version: https://test-web-stack.vercel.app/

## Deployment

**Create the DynamoDB table:**

1. Create a new IAM user with permission for AmazonDynamoDBFullAccess and AWSCloudFormationFullAccess.
2. Save the access key and secret key.
3. Install the AWS CLI and run aws configure.
4. Install the AWS CDK: `npm i -g aws-cdk`.
5. This will prompt you to enter the access key and secret key.
6. Create an .env.local file similar to .env.local.example.
7. Add the access key and secret key to .env.local.
8. Run `cdk deploy` to create a new table Items.
9. View the newly created table and copy the name to .env.local.
10. Run yarn dev to start the Next app at localhost:3000.

**Deploy Web app to Vercel:**

- Sign up with Mapbox to get a access token: https://account.mapbox.com/auth/signup/
- Sign up with Unsplash and create an access token: https://unsplash.com/join
- hit the deploy button bellow and fill the environment variables accordingly

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjuangl%2Ftest-web-stack&env=AWS_DYNAMODB_ACCESS_KEY,AWS_DYNAMODB_SECRET_KEY,AWS_DYNAMODB_REGION,DYNAMODB_TABLE_NAME,UNSPLASH_ACCESS_KEY,NEXT_PUBLIC_MAPBOX_ACCESS_KEY)

## Architecture Overview

### Backend

The Backend is a GraphQL API deployed as a Vercel Serverless function which runs on the [Edge Network](https://vercel.com/docs/concepts/functions/introduction#serverless-functions).

- built with `apollo-server-micro`.
- [Relay Style pagination](https://graphql.org/learn/pagination/#pagination-and-edges)
- DynamoDB for the persistent data


### Frontend

- Server Side Rending Using Next.js
- Data Fetching using Apollo Client (both client and server side) including Relay style pagination
- Styling using CSS Modules
- modal implemented using [React Portals](https://reactjs.org/docs/portals.html) so that the modal is the last node of the document
- mount/unmount animation using [React Transition Group](https://reactcommunity.org/react-transition-group/)

## Create New Users

- go to https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Ftest-web-stack.vercel.app%2Fapi%2Fgraphql
- run the query:
```graphql
mutation($name: String!, $address: String!, $description: String!){
  createUser(name: $name, address: $address, description: $description) {
    id
  }
}
```

this will create an user and add an avatar.
