import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.save(createAccountDto);
  }

  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }

  findUserName(username: string) {
    return this.accountRepository.findOne({
      where: { username: username },
    });
  }
}
