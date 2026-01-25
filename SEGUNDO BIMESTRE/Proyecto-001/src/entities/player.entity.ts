import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from './team.entity';

@Entity('players')
export class Player {
  @ApiProperty({ example: 1, description: 'ID único del jugador' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Lionel Messi',
    description: 'Nombre del jugador',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'Delantero',
    description: 'Posición del jugador',
  })
  @Column({ type: 'varchar', length: 255 })
  position: string;

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece',
  })
  @Column({ type: 'int' })
  teamId: number;

  @ApiProperty({
    type: () => Team,
    description: 'Equipo al que pertenece el jugador',
  })
  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
