import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  const PORT = process.env.PORT || 3210;

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: false,
  //   }),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        // const result = {};
        // errors.forEach(error => {
        //   result[error.property] = error.constraints[Object.keys(error.constraints)[0]]
        // })
        // return new UnprocessableEntityException({
        //   message: result,
        //   error: "Unprocessable Entity",
        //   statusCode: 422
        // });
        return new UnprocessableEntityException({
          errors: result,
          message: "Unprocessable Entity",
          statusCode: 422
        });
      },
      stopAtFirstError: true,
    }),
  );
  // app.useStaticAssets(path.join(__dirname, '../public'))
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(PORT, () => {
    console.log(`Listen on http://localhost:${PORT}`);
  });
}
bootstrap();
