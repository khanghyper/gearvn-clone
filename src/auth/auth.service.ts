import { HttpException, HttpStatus, Injectable, NotFoundException, BadGatewayException, UnauthorizedException, BadRequestException, NotAcceptableException, ConflictException, UnprocessableEntityException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { User, UserDocument } from 'src/user/model/user.model';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid'
import * as dayjs from 'dayjs';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  validateUser = async (email: string, password: string): Promise<any> => {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null
    }
    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      return null
    }
    return user;
  };

  async login(user: UserDocument) {
    const payload = { email: user.email, _id: user._id };
    return {
      data: {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.ACESSTOKEN_KEY,
          expiresIn: '1d'
        }),
      }
    };
  }

  register = async (payload: RegisterDto): Promise<any> => {
    if (payload.confirmPassword !== payload.password) throw new UnprocessableEntityException({
      errors: [
        {
          field: "confirmPassword",
          message: "Mật khẩu không khớp"
        }
      ],
      message: 'Unprocessable Entity',
      statusCode: 422,
    });

    const foundUser = await this.userModel.findOne({
      email: payload.email,
    });
    if (foundUser) {
      throw new UnprocessableEntityException({
        errors: [
          {
            field: "email",
            message: "Email này đã tồn tại, vui lòng chọn email khác!"
          }
        ],
        message: 'Unprocessable Entity',
        statusCode: 422,
      }
      );
    }

    const hashPassword = await hash(payload.password, 10);
    const res = await this.userModel.create({
      ...payload,
      password: hashPassword,
      isActive: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'day')
    });

    return {
      message: 'OK',
      data: omit(res['_doc'], ['password']) as Omit<User, 'password'>,
    };
  }
}
