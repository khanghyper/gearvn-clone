import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Response,
  BadRequestException
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/auth.decorator';
import { Request as ExpressRequest, Response as ExpressRespose } from 'express';
// import { RolesGuard } from './role.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private mailerService: MailerService
  ) { }

  @Public()
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() payload) {
    return await this.authService.register(payload)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('test')
  async test() {
    await this.mailerService.sendMail({
      to: 'khangnd1806@gmail.com',
      subject: 'Testing nest mailermodule',
      text: 'Welcome',
      html: '<b>Hello world</b>'
    })

    return {
      message: 'OK',
    }
  }

}
