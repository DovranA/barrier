import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ format: 'date' })
  @IsString()
  startTime: string;
  @ApiProperty({ format: 'date' })
  @IsString()
  expireTime: string;
  @ApiProperty({ example: 'AB1234AG' })
  @IsString()
  @IsOptional()
  carNumber?: string;
}
