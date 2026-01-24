import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'Vinicius Jr',
    description: 'Nombre del jugador',
  })
  name: string;

  @ApiProperty({
    example: 'Delantero',
    description: 'Posición del jugador',
  })
  position: string;

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece',
  })
  teamId: number;
}

export class UpdatePlayerDto {
  @ApiProperty({
    example: 'Vinicius Jr Alcantara',
    description: 'Nombre del jugador',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'Extremo Izquierdo',
    description: 'Posición del jugador',
    required: false,
  })
  position?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece',
    required: false,
  })
  teamId?: number;
}
