import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { DiscountModule } from './discount/discount.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    AuthModule,
    UserModule,
    ProductModule,
    CloudinaryModule,
    JwtModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ImageModule,
    CategoryModule,
    BrandModule,
    DiscountModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS')
          }
        },
        defaults: {
          from: '"No Reply" <no-reply@gmail.com>'
        }
      }
      ),
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
