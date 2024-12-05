import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    async getCurrentUser(current){
        const newUser:object = await this.prisma.user.findUnique({
            where: { id: current.sub }
        })
        return newUser
    }

    async updateMe(current, dto){
        const hashedPW = await argon.hash(dto.password)
        try {
            const newUser = await this.prisma.user.update({
                where: { email: current.email },
                data: {
                    names: dto.names,
                    email: dto.email,
                    password: hashedPW,
                    phoneNumber: dto.phoneNumber
                    }
            })
            delete newUser.id
            return {
                message: 'data updated successfully',
                data: newUser
            }
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new BadRequestException('email already taken')
                }
            }
        }
    }

    async deleteMe(current){
        const newUser = await this.prisma.user.delete({
            where: { id: current.sub }
        })
        return {
            message: 'user deleted successfully'
        }
    }
}
