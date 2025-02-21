import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Writebox is a text editor designed with simplicity and distraction-free writing. While many applications tend to become feature-rich and complex over time, Writebox takes a different approach. Writebox continues to focus on the essential features required for writing on a computer, providing an environment that allows writers to concentrate without unnecessary distractions.Writebox was developed and released by @shibuya';
  }
}
