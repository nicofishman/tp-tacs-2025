import type { UserSession } from "../types";

const sessions = new Map<number, UserSession>();

export const sessionManager = {
  delete(userId: number): void {
    sessions.delete(userId);
  },
  get(userId: number): UserSession | undefined {
    return sessions.get(userId);
  },

  set(userId: number, session: UserSession): void {
    sessions.set(userId, session);
  },

  update(userId: number, updates: Partial<UserSession>): void {
    const current = sessions.get(userId);
    if (current) {
      sessions.set(userId, { ...current, ...updates });
    }
  },
};
