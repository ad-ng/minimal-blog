import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    async getCurrentUser(current){
        const user:object = await this.prisma.users.findUnique({
            where: { id: current.sub }
        })
        return user
    }
}
