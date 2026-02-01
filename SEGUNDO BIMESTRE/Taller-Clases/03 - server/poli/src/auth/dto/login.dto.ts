import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Nombre de usuario',
  })
  username: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña del usuario',
  })
  password: string;
}
