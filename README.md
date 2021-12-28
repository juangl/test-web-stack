## Deployment

Create the DynamoDB table:

1. Create a new IAM user with permission for AmazonDynamoDBFullAccess and AWSCloudFormationFullAccess.
2. Save the access key and secret key.
3. Install the AWS CLI and run aws configure.
4. Install the AWS CDK: npm i -g aws-cdk.
5. This will prompt you to enter the access key and secret key.
6. Create an .env.local file similar to .env.local.example.
7. Add the access key and secret key to .env.local.
8. Run cdk deploy to create a new table Items.
9. View the newly created table and copy the name to .env.local.
10. Run yarn dev to start the Next app at localhost:3000.

Deploy Web app to Vercel:
