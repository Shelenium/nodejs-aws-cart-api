#!/usr/bin/env node
import 'dotenv/config';
import { App } from 'aws-cdk-lib';
import { NestJsLambdaStack } from '../lib/nest-lambda-stack';

const app = new App();
new NestJsLambdaStack(app, 'ArtRssShopNestJsLambdaStack', {
  env: { account: process.env.AWS_ACCOUNT_ID, region: process.env.AWS_REGION },
});
