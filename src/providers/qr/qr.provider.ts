import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrProvider {
  createDataUrl(content: string): Promise<string> {
    return QRCode.toDataURL(content);
  }
}
