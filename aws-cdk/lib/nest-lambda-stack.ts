import { Construct } from 'constructs';
import { aws_ec2, aws_lambda, CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';

export class NestJsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = aws_ec2.Vpc.fromLookup(this, 'ArtRssShopNestJsVpc', {
      vpcId: process.env.VPC_ID,
     });

    const dbSecurityGroup = aws_ec2.SecurityGroup.fromSecurityGroupId(
      this,
      'ArtRssShopPostgresDbSecurityGroup',
      process.env.DB_SECURITY_GROUP,
    );

    const lambdaSecurityGroup = new aws_ec2.SecurityGroup(this, 'ArtRssShopNestJsLambdaSecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });

    dbSecurityGroup.addIngressRule(
      lambdaSecurityGroup,
      aws_ec2.Port.tcp(+process.env.DB_PORT || 5432),
      'Allow ArtRssShopNestJsLambda to access PostgreSQL'
    );


    const nestLambda = new aws_lambda.Function(this, 'ArtRssShopNestJsLambda', {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      handler: 'lambda.handler',
      code: aws_lambda.Code.fromAsset('./dist'),
      memorySize: 512,
      timeout: Duration.seconds(30),
      vpc,
      securityGroups: [lambdaSecurityGroup],
      vpcSubnets: {
        subnetType: aws_ec2.SubnetType.PUBLIC,
      },
      allowPublicSubnet: true,
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
