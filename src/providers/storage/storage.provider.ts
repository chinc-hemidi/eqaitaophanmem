import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageProvider {
  save(_path: string, _content: string): Promise<void> {
    return Promise.resolve();
  }
}
