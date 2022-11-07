import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	/* Validator config */
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}))

	/* append '/api' to all controller routes */
	app.setGlobalPrefix('api');

	/* OpenAPI config */
	const config = new DocumentBuilder()
		.setTitle('Events Agency')
		.setDescription("Client's events (parties, festivities, others) request management app")
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);


	await app.listen(4000);
}
bootstrap();
