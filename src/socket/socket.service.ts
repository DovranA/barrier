import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { PrismaService } from 'src/prisma.service';
import { EnterCarDto } from 'src/car/dto/car-input.dto';

@Injectable()
export class SocketService {
  constructor(private prisma: PrismaService) {}
  private readonly prismaCar = this.prisma.car;
  private readonly prismaTransaction = this.prisma.transition;
  create(createSocketDto: CreateSocketDto) {
    return 'This action adds a new socket';
  }
  async enterCar(carInfo: EnterCarDto) {
    const car = await this.prismaCar.findFirst({
      where: { carNumber: carInfo.carNumber },
    });
    if (car) {
      const transition = await this.prismaTransaction.create({
        data: { carId: car.id, createdAt: carInfo.enterTime, exist: true },
        include: { car: { include: { user: true } } },
      });
      return {
        carId: transition.carId,
        carNumber: transition.car.carNumber,
        exist: transition.exist,
        enterTime: transition.createdAt,
        userId: transition.car?.userId ?? null,
        userName: transition.car?.user?.name ?? null,
      };
    } else {
      const transition = await this.prismaTransaction.create({
        data: {
          createdAt: carInfo.enterTime,
          exist: true,
          car: { create: { carNumber: carInfo.carNumber } },
        },
        include: { car: { include: { user: true } } },
      });
      // const existCars = transition.
      return {
        carId: transition.carId,
        carNumber: transition.car.carNumber,
        exist: transition.exist,
        enterTime: transition.createdAt,
        userId: transition.car?.userId ?? null,
        userName: transition.car?.user?.name ?? null,
      };
    }
  }
}
