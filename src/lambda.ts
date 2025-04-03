import { Handler, Context, Callback } from 'aws-lambda';
import { nestLambdaBootstrap } from './main';
import * as serverless from 'serverless-http';

let cachedHandler: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!cachedHandler) {
    const app = await nestLambdaBootstrap();
    app.enableCors();
    await app.init();
    const httpServer = app.getHttpAdapter().getInstance();
    cachedHandler = serverless(httpServer); // Wrap HTTP server as a Lambda handler
  }

  return cachedHandler(event, context, callback);
};
