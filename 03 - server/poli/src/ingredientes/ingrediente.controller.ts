import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IngredientesService } from './ingrediente.service';
import { Ingrediente } from './ingrediente.entity';

@Controller('ingredientes')
export class IngredientesController {
  constructor(private readonly ingredientesService: IngredientesService) {}

  // Crear un ingrediente
  @Post()
  async crear(@Body() data: Partial<Ingrediente>) {
    try {
      const ingrediente = await this.ingredientesService.crear(data);
      return { statusCode: HttpStatus.CREATED, data: ingrediente };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un ingrediente
  @Patch(':id')
  async actualizar(@Param('id') id: number, @Body() data: Partial<Ingrediente>) {
    try {
      const ingrediente = await this.ingredientesService.actualizar(id, data);
      if (!ingrediente) {
        throw new HttpException('Ingrediente no encontrado', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: ingrediente };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar un ingrediente
  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      await this.ingredientesService.eliminar(id);
      return { statusCode: HttpStatus.NO_CONTENT };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Obtener un ingrediente por ID
  @Get(':id')
  async obtenerUno(@Param('id') id: number) {
    const ingrediente = await this.ingredientesService.obtenerUno(id);
    if (!ingrediente) {
      throw new HttpException('Ingrediente no encontrado', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: ingrediente };
  }

  // Obtener muchos ingredientes con filtros
  @Get()
  async obtenerMuchos(@Query() filtros: any) {
    const ingredientes = await this.ingredientesService.obtenerMuchos(filtros);
    return { statusCode: HttpStatus.OK, data: ingredientes };
  }
}
 