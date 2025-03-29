"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const nest_lambda_stack_1 = require("../lib/nest-lambda-stack");
const app = new aws_cdk_lib_1.App();
new nest_lambda_stack_1.NestJsLambdaStack(app, 'ArtRssShopNestJsLambdaStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.AWS_REGION },
});
//# sourceMappingURL=cdk.js.map