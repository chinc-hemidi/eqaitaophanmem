import { createHash } from 'node:crypto';

export function hashClientIdentity(payload: string): string {
  return createHash('sha256').update(payload).digest('hex');
}
