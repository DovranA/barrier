import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
    minLength: 6,
  })
  @MinLength(6, { message: 'Please enter a minimum of 6 characters' })
  @IsString()
  password: string;
}
