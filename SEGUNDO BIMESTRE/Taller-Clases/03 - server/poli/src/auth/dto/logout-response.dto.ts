import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty({
    example: 'Sesión cerrada correctamente',
    description: 'Mensaje de cierre de sesión',
  })
  message: string;
}
