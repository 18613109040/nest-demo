import helmet from 'helmet';
import { mw } from 'request-ip';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/exceptions';
import { HttpExceptionsFilter } from './common/filter/http-exceptions';
import { TransformInterceptor } from './common/interceptor/transform';
export const IS_DEV = process.env.NODE_ENV !== 'production';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  const config = app.get(ConfigService);
  // 获取真实 ip
  app.use(mw({ attributeName: 'ip' }));
  // 设置 api 访问前缀
  const prefix = config.get<string>('app.prefix');
  app.setGlobalPrefix(prefix);
  // web 安全，防常见漏洞
  app.use(helmet());
  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true, // 开发环境
      disableErrorMessages: false,
    }),
  );
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // // 所有异常
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
