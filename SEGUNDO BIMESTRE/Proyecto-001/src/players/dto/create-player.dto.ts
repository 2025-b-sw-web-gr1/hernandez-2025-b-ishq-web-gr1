import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Lionel Messi' })
  name: string;

  @ApiProperty({ example: 'Delantero' })
  position: string;

  @ApiProperty({ example: 1 })
  teamId: number;
}

export class UpdatePlayerDto {
  @ApiProperty({ example: 'Lionel Messi', required: false })
  name?: string;

  @ApiProperty({ example: 'Delantero', required: false })
  position?: string;

  @ApiProperty({ example: 1, required: false })
  teamId?: number;
}
