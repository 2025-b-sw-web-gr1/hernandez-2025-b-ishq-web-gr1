import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/create-team.dto';
import { Team } from '../entities/team.entity';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado exitosamente',
    type: Team,
  })
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos',
    type: [Team],
  })
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo' })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado exitosamente',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo' })
  @ApiResponse({ status: 200, description: 'Equipo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teamsService.remove(id);
  }

  @Get(':id/players')
  @ApiOperation({ summary: 'Obtener los jugadores de un equipo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de jugadores del equipo',
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  getPlayersByTeam(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return this.teamsService.getPlayersByTeam(id);
  }
}
