import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { TokenPayload } from '../entity/dto/token/token-payload';

class Jwt {
  constructor(
    private readonly accessExpires = config.server.jwt.expiresInAccess,
    private readonly refreshExpires = config.server.jwt.expiresInRefresh,
    private readonly accessSecret = config.server.jwt.accessSecret,
    private readonly refreshSecret = config.server.jwt.refreshSecret
  ) {}

  public generateTokens(token: TokenPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken: string = jwt.sign({ ...token }, this.accessSecret, {
      expiresIn: this.accessExpires,
    });
    const refreshToken: string = jwt.sign({ ...token }, this.refreshSecret, {
      expiresIn: this.refreshExpires,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public validateAccessToken(token: string): JwtPayload | string | null {
    return this.validateToken(token, this.accessSecret);
  }

  public validateRefreshToken(token: string): JwtPayload | string | null {
    return this.validateToken(token, this.refreshSecret);
  }

  private validateToken(
    token: string,
    secret: string
  ): JwtPayload | string | null {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }
}

export default new Jwt();
