#!/usr/bin/env node

const cdk = require("@aws-cdk/core");
const { DynamoStack } = require("../lib/cdkStack");

const app = new cdk.App();
new DynamoStack(app, "DynamoStack");
