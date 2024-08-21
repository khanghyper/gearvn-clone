import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty({
  //   message: 'Mật khẩu không được để trống.'
  // })
  // @MinLength(6, {
  //   message: 'Mật khẩu phải từ 6 ký tự'
  // })
  // @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {
  //   message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một chữ số và một ký tự đặc biệt.',
  // })
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  confirmPassword: string
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
