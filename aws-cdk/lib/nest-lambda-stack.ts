import { Construct } from 'constructs';
import { aws_lambda, CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';

export class NestJsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nestLambda = new aws_lambda.Function(this, 'ArtRssShopNestJsLambda', {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      handler: 'lambda.handler',
      code: aws_lambda.Code.fromAsset('./dist'),
      memorySize: 512,
      timeout: Duration.seconds(30),
      environment: {
        NODE_ENV: 'lambda',
      },
    });

    new CfnOutput(this, 'ArtRssShopNestJsLambdaName', {
      value: nestLambda.functionName,
      description: 'Nest.js Lambda Function Name',
    });

    new CfnOutput(this, 'ArtRssShopNestJsLambdaArn', {
      value: nestLambda.functionArn,
      description: 'Nest.js Lambda Function ARN',
    });;
  }
}
