import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { jwtConstants } from './constants';

// Lưu ý khi dùng jwt mạnh dùng thuật toán mạnh hs256, v.v..
// Kiểm tra tính hợp lệ của token: Xem nó có bị làm giả không, còn hạn không,
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token khong hop le', error);
    }
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.accountService.findUserName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const randomSub = this.generateRandomString(16);
    const payload = { sub: randomSub };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        algorithm: 'RS512',
      }),
    };
    // Thuật toán RS512 là thuật toán mạnh nhất -> độ mạnh theo chiều giảm dần
  }

  generateRandomString(length: number): string {
    const characters = jwtConstants.secret;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
