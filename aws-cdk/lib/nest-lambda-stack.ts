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
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
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
