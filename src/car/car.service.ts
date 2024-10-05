import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma.service';
import { IFindCategoriesFilters } from './interface/find-cars-pagination.interface';
import {
  CarOutputDto,
  EnterCarOutputDto,
  EnteredCarPaginated,
} from './dto/car-output.dto';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { CreateCarDto, EnterCarDto } from './dto/car-input.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  private readonly prismaCar = this.prisma.car;
  private readonly prismaTransaction = this.prisma.transition;
  async existCars(filters: IFindCategoriesFilters) {
    const paginate = createPaginator({ perPage: filters.perPage ?? 10 });
    const paginatedExistCars = await paginate<EnteredCarPaginated, any>(
      this.prismaTransaction,
      {
        where: { exist: true },
        include: {
          car: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
        orderBy: [
          {
            car: {
              carNumber: 'asc', // Сортировка по номеру машины
            },
          },
          {
            createdAt: 'desc', // Сортировка по времени создания
          },
        ],
        distinct: ['carId'], // Уникальные записи по carId
        take: filters.perPage ?? 10,
        skip: (filters.page ? filters.page - 1 : 0) * (filters.perPage ?? 10),
      },
      {
        page: filters.page ?? 1,
      },
    );
    const existCars = paginatedExistCars.data.map((transition) => {
      return {
        carId: transition.carId,
        carNumber: transition.car.carNumber,
        exist: transition.exist,
        enterTime: transition.createdAt,
        userId: transition.car?.userId ?? null,
        userName: transition.car?.user?.name ?? null,
      };
    });
    return { ...paginatedExistCars, data: existCars };
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
  async getCar(id: string) {
    const car = await this.prismaCar.findUnique({
      where: { id },
      include: { transition: true },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }
  async getCarByNum(num: string) {
    const car = await this.prismaCar.findFirst({ where: { carNumber: num } });
    if (!car) {
      throw new NotFoundException('Car not found by number');
    }
    return car;
  }
  async getCars(
    filters: IFindCategoriesFilters,
  ): Promise<PaginatedOutputDto<CarOutputDto>> {
    const paginate = createPaginator({ perPage: filters.perPage ?? 10 });
    const paginatedCars = await paginate<CarOutputDto, any>(
      this.prismaCar,
      {
        where: {},
        include: {
          user: {
            select: {
              id: true,
              name: true, // Только поле name для формирования userName
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      },
      {
        page: filters.page ?? 1,
      },
    );
    const carsWithUserName = paginatedCars.data.map((car) => ({
      ...car,
      userName: car.user?.name || null,
      userId: car.user?.id || null,
      user: undefined,
    }));

    return {
      ...paginatedCars,
      data: carsWithUserName,
    };
  }
  async createCar(dto: CreateCarDto) {
    Object.entries(dto).forEach(([key, value]) => {
      if (!key || !value) {
        throw new BadRequestException(`Invalid ${key}`);
      }
    });
    try {
      return await this.prismaCar.create({ data: dto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException(error.meta.cause);
    }
  }
}
