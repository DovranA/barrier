import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {} from 'date-fns';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const date = new Date().toISOString().split('T')[1];
    const user = await this.prisma.user.findUnique({
      where: { name: dto.name },
    });
    if (user) {
      throw new BadRequestException('User exist');
    }
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        expireTime: dto.expireTime + 'T' + date,
        startTime: dto.startTime + 'T' + date,
      },
    });
    let createdUser = {
      id: newUser.id,
      name: newUser.name,
      startTime: newUser.startTime,
      expireTime: newUser.expireTime,
      carId: null,
      carNumber: null,
    };
    if (dto.carNumber) {
      const car = await this.prisma.car.create({
        data: { carNumber: dto.carNumber, userId: newUser.id },
      });
      createdUser = { ...createdUser, carId: car.id, carNumber: dto.carNumber };
    }
    return createdUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
