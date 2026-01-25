import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;

  @ApiProperty({ example: 'España' })
  country: string;
}

export class UpdateTeamDto {
  @ApiProperty({ example: 'Barcelona FC', required: false })
  name?: string;

  @ApiProperty({ example: 'España', required: false })
  country?: string;
}
