import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import appConfig from './app.config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(appConfig.KEY)
    private readonly appConfigurations: ConfigType<typeof appConfig>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
