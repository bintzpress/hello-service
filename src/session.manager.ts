import { randomUUID } from 'crypto';
import { Session } from './session';

export class SessionManager {
  sessions: { [key: string]: Session } = {};

  openSession(): string {
    const session = new Session(randomUUID());
    this.sessions[session.getSessionId()] = session;
    return session.getSessionId();
  }

  closeSession(sessionId: string) {
    delete this.sessions[sessionId];
  }

  getSession(sessionId: string): Session {
    if (this.sessions[sessionId]) {
      return this.sessions[sessionId];
    } else {
      return null;
    }
  }
}
