import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, Role, User } from 'src/user/model/user.model';
import { omit } from 'lodash';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  findAll = async () => {
    const users = await this.userModel
      .find({}, { password: 0 })
      .populate('role', 'title _id')
      .exec();

    return users;
  };

  addPermission = async () => {
    const res = await this.permissionModel.create([
      { url: 'users/create', description: 'create user' },
      { url: 'users/update', description: 'update user' },
      { url: 'users/delete', description: 'delete user' },
    ]);
    return true;
  };

  createUser = async (user, req: ExpressRequest) => {
    // const res = await this.userModel.create(user);
    // const resRole = await this.roleModel.findByIdAndUpdate('66938cb54925f219fa56ea4e', {
    //   $push: []
    // })

    // await this.addPermission();

    return {
      mesage: 'oke',
    };
  };
}
