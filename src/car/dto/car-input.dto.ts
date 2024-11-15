import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Car } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'AB1234AG' })
  @IsString()
  carNumber: string;
  @ApiProperty({ format: 'date-time' })
  @IsString()
  createdAt: string;
  @ApiProperty({ format: 'date-time' })
  @IsString()
  updatedAt: string;
  @ApiPropertyOptional({ format: 'uuid', example: 'cm1dxzknt0000mx6e12jc4sc6' })
  @IsString()
  @IsOptional()
  userId: string;
}

export class EnterCarDto {
  @IsNotEmpty()
  @Matches(/^[A-Z]{1,2}\d{4}[A-Z]{2,3}$/)
  @ApiProperty({ example: 'AB1234AG' })
  @IsString()
  carNumber: string;
}

export class ScanCodeDto {
  @IsNotEmpty()
  @Matches(/^[A-Z]{1,2}\d{4}[A-Z]{2,3}$/)
  @IsString()
  carNumber: string;
  @IsString()
  enterAt: string;
  @IsString()
  scannedCode: string;
}
