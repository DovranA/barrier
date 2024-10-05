import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({
    example: 'cm1dxzknt0000mx6e12jc4sc6',
    description: 'ID пользователя',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  name: string;

  @ApiProperty({
    example: '2024-09-22T18:58:59.801Z',
    description: 'Дата создания пользователя',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-09-22T18:58:59.801Z',
    description: 'Дата последнего обновления пользователя',
  })
  updatedAt: string;
}

export class ProfileResponseDto {
  @ApiProperty({ type: UserDto, description: 'Информация о пользователе' })
  user: UserDto;

  @ApiProperty({
    description: 'JWT токен доступа',
    format: 'uuid',
  })
  accessToken: string;
}
