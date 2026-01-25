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
import { PlayersService } from './players.service';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/create-player.dto';
import { Player } from '../entities/player.entity';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo jugador' })
  @ApiResponse({
    status: 201,
    description: 'Jugador creado exitosamente',
    type: Player,
  })
  @ApiResponse({ status: 400, description: 'El equipo especificado no existe' })
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los jugadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de jugadores',
    type: [Player],
  })
  findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un jugador por ID' })
  @ApiResponse({
    status: 200,
    description: 'Jugador encontrado',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un jugador' })
  @ApiResponse({
    status: 200,
    description: 'Jugador actualizado exitosamente',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  @ApiResponse({ status: 400, description: 'El equipo especificado no existe' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un jugador' })
  @ApiResponse({ status: 200, description: 'Jugador eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.playersService.remove(id);
  }
}
