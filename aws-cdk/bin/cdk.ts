import { App } from 'aws-cdk-lib';
import { NestJsLambdaStack } from '../lib/nest-lambda-stack';

const app = new App();
new NestJsLambdaStack(app, 'ArtRssShopNestJsLambdaStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.AWS_REGION },
});
