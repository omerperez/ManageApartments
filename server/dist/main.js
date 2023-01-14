"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const process_1 = require("process");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    AWS.config.update({
        accessKeyId: process_1.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process_1.env.AWS_SECRET_ACCESS_KEY,
        region: process_1.env.AWS_REGION,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Apartment Manager Backend Documents')
        .setDescription('Apartment Manager backend using postgreSQL & NestJS ')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map