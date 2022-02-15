export class Session {
  private sessionId: string;
  private lastActive: Date;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.lastActive = new Date();
  }

  tick() {
    this.lastActive = new Date();
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getLastActive(): Date {
    return this.lastActive;
  }
}
