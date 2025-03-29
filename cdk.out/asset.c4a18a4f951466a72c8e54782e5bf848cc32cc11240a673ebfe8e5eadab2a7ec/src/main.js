"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestLambdaBootstrap = nestLambdaBootstrap;
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('APP_PORT') || 4000;
    app.enableCors({
        origin: (req, callback) => callback(null, true),
    });
    app.use((0, helmet_1.default)());
    await app.listen(port, () => {
        console.log('App is running on %s port', port);
    });
}
bootstrap();
async function nestLambdaBootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (req, callback) => callback(null, true),
    });
    app.use((0, helmet_1.default)());
    return app;
}
if (process.env.NODE_ENV !== 'lambda') {
    (async () => {
        const app = await nestLambdaBootstrap();
        const configService = app.get(config_1.ConfigService);
        const port = configService.get('APP_PORT') || 4000;
        await app.listen(port);
        console.log(`Application is running locally on: http://localhost:${port}`);
    })();
}
//# sourceMappingURL=main.js.map