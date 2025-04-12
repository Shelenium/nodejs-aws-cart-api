import { Handler, Context, Callback } from 'aws-lambda';
import { nestLambdaBootstrap } from './main';
import * as serverless from 'serverless-http';
import { DataSource } from 'typeorm';

let cachedHandler: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!cachedHandler) {
    const app = await nestLambdaBootstrap();
    const dataSource = app.get(DataSource);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    app.enableCors();
    await app.init();
    const httpServer = app.getHttpAdapter().getInstance();
    cachedHandler = serverless(httpServer);
  }

  return cachedHandler(event, context, callback);
};
