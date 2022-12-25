import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '../../user/modules/user.interface';
import { UserService } from '../../user/services/user.service';
import RefreshToken from '../entities/refresh-token.entity';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];
  constructor(private readonly userService: UserService) {}

  async login(
    mobile: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.getUserById({ id: mobile });
    if (!user) {
      return undefined;
    }
    const isPasswordPropper = await argon2.verify(user.password, password);
    if (isPasswordPropper) {
      return this.newRefreshAndAccessToken(user, values);
    }
    return undefined;
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }
    const user = await this.userService.getUserById({
      id: refreshToken.userId,
    });
    if (!user) {
      return undefined;
    }
    const accessToken = {
      userId: refreshToken.userId,
    };
    return jsonwebtoken.sign(accessToken, process.env.SECRET_TOKEN, {
      expiresIn: '6h',
    });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = jsonwebtoken.verify(refreshStr, process.env.SECRET_TOKEN);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.mobile,
    });
    this.refreshTokens.push(refreshObject);
    return {
      refreshToken: refreshObject.sign(),
      accessToken: jsonwebtoken.sign(
        {
          userId: user.mobile,
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: '6h',
        },
      ),
    };
  }
  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
  }
}
