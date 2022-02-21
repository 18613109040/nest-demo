import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ResultData } from 'src/common/utils/result';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/create')
  async create(@Body() dto: CreateAccountDto): Promise<ResultData> {
    return await this.accountService.create(dto);
  }
}
