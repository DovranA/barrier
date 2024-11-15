import { Body, Controller, Post } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { EnterCarDto } from 'src/car/dto/car-input.dto';

@Controller('socket')
export class SocketController {
  constructor(
    private readonly socketGateway: SocketGateway,
    private socketService: SocketService,
  ) {}

  @Post('open')
  async triggerEvents(@Body() dto: EnterCarDto) {
    const transaction = await this.socketService.enterCar(dto);
    if (transaction) {
      this.socketGateway.server.emit('openBarrier', { open: true });
      this.socketGateway.server.emit('refreshAdmin', { refresh: true });
    }
    // Emit events when the HTTP POST request is received
    return { message: 'Events triggered successfully' };
  }
}
