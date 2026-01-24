import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Real Madrid',
    description: 'Nombre del equipo',
  })
  name: string;

  @ApiProperty({
    example: 'España',
    description: 'País del equipo',
  })
  country: string;
}

export class UpdateTeamDto {
  @ApiProperty({
    example: 'Real Madrid CF',
    description: 'Nombre del equipo',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'España',
    description: 'País del equipo',
    required: false,
  })
  country?: string;
}
