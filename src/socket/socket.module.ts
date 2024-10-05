import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SocketGateway, SocketService, PrismaService],
})
export class SocketModule {}
