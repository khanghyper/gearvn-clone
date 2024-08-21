import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
  Query,
  Sse,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/auth/auth.decorator';
import { Response as Responsev1 } from 'express';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { interval, map, Observable } from 'rxjs';

interface MessageEvent {
  data: string | object
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }


  @Get('test')
  test() {
    return {
      message: 'OK'
    }
  }

}
