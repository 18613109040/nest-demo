import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AppHttpCode } from 'src/common/enums/http-code.enum';
import { ResultData } from 'src/common/utils/result';
import { getManager, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(dto: CreateAccountDto): Promise<ResultData> {
    const existing = await this.accountRepository.findOne({
      mobile: dto.mobile,
    });
    if (existing)
      return ResultData.fail(
        AppHttpCode.USER_CREATE_EXISTING,
        '该手机号已经注册',
      );
    const salt = await genSalt();
    const password = await hash(dto.password, salt);
    const account = plainToInstance(
      AccountEntity,
      { ...dto, password },
      { ignoreDecorators: true },
    );
    const result = await getManager().transaction(
      async (transactionalEntityManager) => {
        return await transactionalEntityManager.save<AccountEntity>(account);
      },
    );
    return ResultData.ok(instanceToPlain(result));
  }
}
