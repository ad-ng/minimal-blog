import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( 
        private prisma: PrismaService,
        private jwt: JwtService
    ){}
    async login(dto){
        const user = await this.prisma.users.findUnique({
            where: {
                email: dto.email
            }
        })
        if(!user) throw new ForbiddenException('invalid credentials')

        const checkPassword: boolean = await argon.verify(user.password, dto.password)
        
        if(!checkPassword) throw new ForbiddenException('invalid credentials')       

        return { access_token: await this.signToken(user.id, user.email, user.names) } 
    
    }

    async register(dto){
        const hash:string =  await argon.hash(dto.password)
        const user =  await this.prisma.users.create({
            data: {
                password: hash,
                email: dto.email,
                names: dto.names
            }
        })
        return { access_token: await this.signToken(user.id, user.email, user.names) }
    }

    async signToken(id: number, email: string, names: string){
        const payload = {
            sub: id,
            email,
            names
        }
        return await this.jwt.signAsync(payload,{
            secret: process.env.JWT_SECRET
        })
    }
}
