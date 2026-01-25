import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    if (!createTeamDto.name || !createTeamDto.country) {
      throw new BadRequestException(
        'El nombre y país del equipo son requeridos',
      );
    }

    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamsRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException(`El equipo con ID ${id} no fue encontrado`);
    }

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);

    if (updateTeamDto.name) {
      team.name = updateTeamDto.name;
    }

    if (updateTeamDto.country) {
      team.country = updateTeamDto.country;
    }

    return this.teamsRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamsRepository.remove(team);
  }

  async getPlayersByTeam(id: number): Promise<any[]> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException(`El equipo con ID ${id} no fue encontrado`);
    }

    return team.players;
  }
}
