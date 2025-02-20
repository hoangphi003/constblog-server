import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const username = createAccountDto.username;
      const info = await this.accountService.findUserName(username);
      if (info?.username) {
        throw new HttpException('User invalid', HttpStatus.EXPECTATION_FAILED);
      }
      return await this.accountService.create(createAccountDto);
    } catch (error) {
      throw new HttpException(
        {
          error: error.message || 'Create Fails',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.accountService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Find All Fail',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.accountService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Find All Fail',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      return this.accountService.update(+id, updateAccountDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'updateAccountDto Fail',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
