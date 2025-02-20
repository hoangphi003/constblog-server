import { Injectable } from '@nestjs/common';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

@Injectable()
export class CreateAccountDto {
  @IsNotEmpty()
  @MinLength(2, { message: 'Username must have atleast 2 characters.' })
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  avatar: string;

  createAt: Date;
  updateAt: Date;
}
