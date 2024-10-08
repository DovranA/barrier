import { IsOptional, IsString, MinLength } from 'class-validator';

export class AdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  @IsString()
  password?: string;
}
