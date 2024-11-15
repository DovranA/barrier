import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from 'src/prisma.service';
import { SocketController } from './socket.controller';
@Module({
  providers: [SocketGateway, SocketService, PrismaService],
  controllers: [SocketController],
})
export class SocketModule {}
