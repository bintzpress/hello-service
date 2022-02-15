import { Injectable, Logger } from '@nestjs/common';
import { SessionManager } from './session.manager';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = new SessionManager();
  }

  openSession(): { [key: string]: string } {
    const sessionId = this.sessionManager.openSession();
    return { response: 'success', sessionId: sessionId };
  }

  closeSession(sessionId: string): { [key: string]: string } {
    this.sessionManager.closeSession(sessionId);
    return { response: 'success' };
  }

  hello(sessionId: string): { [key: string]: string } {
    const session = this.sessionManager.getSession(sessionId);
    if (session) {
      session.tick();
      return { response: 'goodbye' };
    } else {
      return { response: 'error', error: '10' };
    }
  }
}
