import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 'User not found', description: 'Error description' })
  message: string;

  @ApiProperty({ example: 'Not Found', description: 'Error type' })
  error: string;

  @ApiProperty({ example: 400, description: 'HTTP status code' })
  statusCode: number;
}
