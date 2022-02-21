import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsMobilePhone(
    'zh-CN',
    {},
    {
      message: '手机格式不正确',
    },
  )
  @IsNotEmpty({ message: '请填写手机号' })
  public readonly mobile: string;

  @IsNotEmpty({ message: '请填写短信验证' })
  public readonly code: string;

  @IsNotEmpty({ message: '请填写密码' })
  public readonly password: string;
}
