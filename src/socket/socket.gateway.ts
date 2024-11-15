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
import { format } from 'date-fns';
@WebSocketGateway({ cors: '*' })
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
  async enterCar(@MessageBody() dto: EnterCarDto) {
    const transaction = await this.socketService.enterCar(dto);
    if (transaction) {
      this.server.emit('openBarrier', { open: true });
      this.server.emit('refreshAdmin', { refresh: true });
    }
  }
  @SubscribeMessage('leaveCar')
  async leaveCar(@MessageBody() dto: EnterCarDto) {
    if (!dto) {
      this.server.emit('errorHandler', {
        message: 'CarNumber not',
        name: 'error',
      });
    } else {
      const car = await this.socketService.leaveCar(dto);
      if (car) {
        const enterAt = format(car.createdAt, 'dd.MM.yyyy');
        this.server.emit('refreshAdmin', { refresh: true });
        this.server.emit('terminal', {
          carNumber: car.carNumber,
          enterAt,
          scan: true,
        });
      }
    }
  }
  @SubscribeMessage('scanResult')
  async scanResult(@MessageBody() dto: any) {
    console.log(dto);
  }
}
