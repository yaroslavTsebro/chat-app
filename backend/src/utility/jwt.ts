import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { TokenPayload } from '../entity/dto/token/token-payload';
import { OtpPayload } from '../entity/dto/otp/otp-payload';

class Jwt {
  constructor(
    private readonly accessExpires = config.server.jwt.expiresInAccess,
    private readonly refreshExpires = config.server.jwt.expiresInRefresh,
    private readonly accessSecret = config.server.jwt.accessSecret,
    private readonly refreshSecret = config.server.jwt.refreshSecret,
    private readonly otpSecret = config.server.otp.secret
  ) {}

  public generateTokens(token: TokenPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.generateToken(
      token,
      this.accessSecret,
      this.accessExpires
    );

    const refreshToken = this.generateToken(
      token,
      this.refreshSecret,
      this.refreshExpires
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateToken(
    token: TokenPayload | OtpPayload,
    secret: string,
    expirationTime: string
  ): string {
    return jwt.sign({ ...token }, secret, {
      expiresIn: expirationTime,
    });
  }

  public validateAccessToken(token: string): JwtPayload | string | null {
    return this.validateToken(token, this.accessSecret);
  }

  public validateOtp(token: string): JwtPayload | string | null {
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
