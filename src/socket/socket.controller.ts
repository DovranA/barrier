import { Controller, Post } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}

  @Post('open')
  triggerEvents() {
    // Emit events when the HTTP POST request is received
    this.socketGateway.server.emit('openBarrier', { open: true });
    this.socketGateway.server.emit('refreshAdmin', { refresh: true });
    return { message: 'Events triggered successfully' };
  }
}
