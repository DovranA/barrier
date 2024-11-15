import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnterCarDto } from 'src/car/dto/car-input.dto';

@Injectable()
export class SocketService {
  constructor(private prisma: PrismaService) {}
  private readonly prismaCar = this.prisma.car;
  private readonly prismaTransaction = this.prisma.transition;
  async leaveCar(carInfo: EnterCarDto) {
    const car = await this.prismaCar.findFirstOrThrow({
      where: { carNumber: carInfo.carNumber },
      orderBy: { createdAt: 'desc' },
      include: {
        transition: {
          where: { exist: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        user: true,
      },
      take: 1,
    });
    return car;
  }
  async enterCar(carInfo: EnterCarDto) {
    const car = await this.prismaCar.findFirst({
      where: { carNumber: carInfo.carNumber },
    });
    if (car) {
      const transition = await this.prismaTransaction.create({
        data: {
          carId: car.id,
          exist: true,
        },
        include: { car: { include: { user: true } } },
      });
      return {
        id: transition.id,
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
          exist: true,
          car: { create: { carNumber: carInfo.carNumber } },
        },
        include: { car: { include: { user: true } } },
      });
      return {
        id: transition.id,
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
