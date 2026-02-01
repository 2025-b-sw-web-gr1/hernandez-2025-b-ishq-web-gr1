import {
  Controller,
  Post,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ya existe una sesión activa',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  login(
    @Body() body: LoginDto,
    @Req() req: Request & any,
    @Res() res: Response,
  ) {
    const { username, password } = body;

    if (req.session.user) {
      return res.status(400).json({
        message: 'Ya existe una sesión activa, deslogee primero.',
      });
    }

    if (username === 'admin' && password === '12345678') {
      req.session.user = 'admin';
      return res.json({
        message: 'Login exitoso',
        user: req.session.user,
      });
    } else {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  }

  @Post('logout')
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente',
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'No hay sesión activa',
  })
  logout(@Req() req: Request & any, @Res() res: Response) {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        return res.json({ message: 'Sesión cerrada correctamente' });
      });
    } else {
      return res.status(400).json({ message: 'No hay sesión activa' });
    }
  }
}
