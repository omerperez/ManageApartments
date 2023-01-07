"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    AWS.config.update({
        accessKeyId: 'AKIARRGFTIZHJTUKLAAU',
        secretAccessKey: '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',
        region: 'eu-west-1',
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