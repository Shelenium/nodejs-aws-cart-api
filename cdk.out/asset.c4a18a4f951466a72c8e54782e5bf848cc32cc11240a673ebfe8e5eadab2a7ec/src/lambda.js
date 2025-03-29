"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const main_1 = require("./main");
const serverless = require("serverless-http");
let cachedHandler;
const handler = async (event, context, callback) => {
    if (!cachedHandler) {
        const app = await (0, main_1.nestLambdaBootstrap)();
        await app.init();
        const httpServer = app.getHttpAdapter().getInstance();
        cachedHandler = serverless(httpServer);
    }
    return cachedHandler(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map