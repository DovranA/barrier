import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './events/events.gateway';
import { EnterCarDto } from 'src/car/dto/car-input.dto';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}
  @WebSocketServer() server: Server<any, ServerToClientEvents>;
  afterInit(server: Server) {
    console.log('WebSocketGateway initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  @SubscribeMessage('enterCar')
  async sendMessage(@MessageBody() dto: EnterCarDto) {
    const transaction = await this.socketService.enterCar(dto);
    if (transaction) {
      this.server.emit('openBarrier', { open: true });
    }
  }
}
