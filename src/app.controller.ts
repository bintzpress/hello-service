import { Controller, Get, Header, Logger, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import mime from 'mime';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('openSession')
  @Header('content-type', 'application/json')
  openSession(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies.sessionId) {
      this.appService.closeSession(request.cookies.sessionId);
    }
    const result = this.appService.openSession();
    if (result.sessionId) {
      response.cookie('sessionId', result.sessionId);
    }
    return JSON.stringify(result, null, 4);
  }

  @Get('closeSession')
  @Header('content-type', 'application/json')
  closeSession(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies.sessionId) {
      const sessionId = request.cookies.sessionId;
      const result = this.appService.closeSession(sessionId);
      response.clearCookie('sessionId');
      return JSON.stringify(result, null, 4);
    } else {
      const result = { response: 'error', error: '10' }; // cookie error
      return JSON.stringify(result, null, 4);
    }
  }

  @Get('hello')
  @Header('content-type', 'application/json')
  hello(@Req() request: Request): string {
    if (request.cookies.sessionId) {
      const sessionId = request.cookies.sessionId;
      return JSON.stringify(this.appService.hello(sessionId), null, 4);
    } else {
      const result = { response: 'error', error: '10' };
      return JSON.stringify(result, null, 4);
    }
  }
}
