import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { AdminDto } from './dto/admin.dto';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  getById(id: string) {
    return this.prisma.admin.findUnique({
      where: { id },
    });
  }
  getByName(name: string) {
    return this.prisma.admin.findUnique({
      where: { name },
    });
  }
  async getProfile(id: string) {
    const profile = await this.getById(id);

    const { password, ...res } = profile;
    return {
      ...res,
    };
  }
  async create(dto: AuthDto) {
    const user = {
      name: dto.name,
      password: await hash(dto.password),
    };
    return this.prisma.admin.create({ data: user });
  }
  async update(id: string, dto: AdminDto) {
    let data = dto;
    console.log(data);
    if (dto.password) {
      console.log('first');
      data = { ...dto, password: await hash(dto.password) };
    }
    try {
      return await this.prisma.admin.update({
        where: { id },
        data,
        select: {
          name: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.meta.target);
    }
  }
}
