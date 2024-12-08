import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async login(dto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('invalid credentials');

    const checkPassword: boolean = await argon.verify(
      user.password,
      dto.password,
    );

    if (!checkPassword) throw new ForbiddenException('invalid credentials');

    return {
      access_token: await this.signToken(user.id, user.email, user.names),
    };
  }

  async register(dto) {
    const hash: string = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          password: hash,
          email: dto.email,
          names: dto.names,
        },
      });
      return {
        access_token: await this.signToken(user.id, user.email, user.names),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new BadRequestException('email already taken');
        }
      }
    }
  }

  async signToken(id: number, email: string, names: string) {
    const payload = {
      sub: id,
      email,
      names,
    };
    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
