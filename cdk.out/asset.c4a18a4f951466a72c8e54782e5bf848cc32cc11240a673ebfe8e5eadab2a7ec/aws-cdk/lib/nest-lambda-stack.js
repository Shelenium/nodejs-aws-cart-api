"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJsLambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class NestJsLambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const nestLambda = new aws_cdk_lib_1.aws_lambda.Function(this, 'ArtRssShopNestJsLambda', {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            handler: 'lambda.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset('./dist'),
            memorySize: 512,
            timeout: aws_cdk_lib_1.Duration.seconds(30),
            environment: {
                NODE_ENV: 'lambda',
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'ArtRssShopNestJsLambdaName', {
            value: nestLambda.functionName,
            description: 'Nest.js Lambda Function Name',
        });
        new aws_cdk_lib_1.CfnOutput(this, 'ArtRssShopNestJsLambdaArn', {
            value: nestLambda.functionArn,
            description: 'Nest.js Lambda Function ARN',
        });
        ;
    }
}
exports.NestJsLambdaStack = NestJsLambdaStack;
//# sourceMappingURL=nest-lambda-stack.js.map