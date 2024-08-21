import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { RolesGuard } from 'src/auth/role.guard';
import { Public } from 'src/auth/auth.decorator';
import { User } from 'src/user/model/user.model';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { Request as ExpressRequest } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  // // @UseGuards(new RolesGuard('api/v1/user/update1'))
  // // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Req() req): any{
  //   return []
  // }

  // @Public()
  // @Get('detail')
  // findDetail(@Req() req): any{
  //   return {
  //     name: 'khang'
  //   }
  // }

  // @Public()

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Post()
  // // @UseGuards(new RolesGuard('products/create'))
  // createUser(@Body() body: any, @Request() req: ExpressRequest) {
  //   return this.userService.createUser(body, req);
  // }

  @Post()
  @Public()
  async createUser(@Body() body) {

  }
}
