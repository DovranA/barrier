import { ApiProperty } from '@nestjs/swagger';
import { User, Transition, Car } from '@prisma/client';
import { IsNotEmpty, Matches } from 'class-validator';

export class CarOutputDto {
  @ApiProperty({
    example: 'cm1dxzknt0000mx6e12jc4sc6',
    description: 'ID if car',
    format: 'uuid',
  })
  id: string;
  @ApiProperty({
    example: 'AB1234AG',
    description: 'Number of car',
  })
  number: string;
  @ApiProperty({
    description: 'Create Date of car',
    format: 'date',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'Update Date of car',
    format: 'date',
  })
  updateAt: Date;

  @ApiProperty({
    example: 'cm1dxzknt0000mx6e12jc4sc6',
    description: 'ID пользователя',
    format: 'uuid',
  })
  userId: string;

  user: User;
}
export type EnteredCarPaginated = Transition & { car: Car & { user: User } };
export class EnterCarOutputDto {
  @ApiProperty({
    nullable: true,
    format: 'uuid',
    example: 'cm1dxzknt0000mx6e12jc4sc6',
  })
  id: string;
  @ApiProperty({
    nullable: true,
    format: 'uuid',
    example: 'cm1dxzknt0000mx6e12jc4sc6',
  })
  carId: string;
  @IsNotEmpty()
  @Matches(/^[A-Z]{1,2}\d{4}[A-Z]{2,3}$/)
  @ApiProperty({ example: 'AB1234AG' })
  carNumber: string;
  @ApiProperty()
  exist: boolean;
  @ApiProperty({ format: 'date-time' })
  enterTime: string;
  @ApiProperty({ nullable: true })
  userId?: string;
  @ApiProperty({ nullable: true })
  userName?: string;
}
export class EnterCarOutputDtoWithTransaction {
  @ApiProperty({
    nullable: true,
    format: 'uuid',
    example: 'cm1dxzknt0000mx6e12jc4sc6',
  })
  id: string;
  @ApiProperty({
    nullable: true,
    format: 'uuid',
    example: 'cm1dxzknt0000mx6e12jc4sc6',
  })
  carId: string;
  @IsNotEmpty()
  @Matches(/^[A-Z]{1,2}\d{4}[A-Z]{2,3}$/)
  @ApiProperty({ example: 'AB1234AG' })
  carNumber: string;
  @ApiProperty()
  exist: boolean;
  @ApiProperty({ format: 'date-time' })
  enterTime: string;
  @ApiProperty({ nullable: true })
  userId?: string;
  @ApiProperty({ nullable: true })
  userName?: string;
  @ApiProperty({ nullable: true })
  transition: Transition;
}
