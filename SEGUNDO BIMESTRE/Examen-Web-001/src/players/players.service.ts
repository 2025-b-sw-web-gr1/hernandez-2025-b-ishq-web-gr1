import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Team } from '../entities/team.entity';
import { CreatePlayerDto, UpdatePlayerDto } from '../dtos/player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (!createPlayerDto.name || !createPlayerDto.position || !createPlayerDto.teamId) {
      throw new BadRequestException(
        'El nombre, posición y ID del equipo son requeridos',
      );
    }

    // Verificar que el equipo existe
    const team = await this.teamsRepository.findOne({
      where: { id: createPlayerDto.teamId },
    });

    if (!team) {
      throw new BadRequestException(
        `El equipo con ID ${createPlayerDto.teamId} no existe`,
      );
    }

    const player = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.find({ relations: ['team'] });
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!player) {
      throw new NotFoundException(
        `El jugador con ID ${id} no fue encontrado`,
      );
    }

    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);

    // Si se actualiza el teamId, verificar que el equipo existe
    if (updatePlayerDto.teamId) {
      const team = await this.teamsRepository.findOne({
        where: { id: updatePlayerDto.teamId },
      });

      if (!team) {
        throw new BadRequestException(
          `El equipo con ID ${updatePlayerDto.teamId} no existe`,
        );
      }

      player.teamId = updatePlayerDto.teamId;
    }

    if (updatePlayerDto.name) {
      player.name = updatePlayerDto.name;
    }

    if (updatePlayerDto.position) {
      player.position = updatePlayerDto.position;
    }

    return this.playersRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    await this.playersRepository.remove(player);
  }
}
