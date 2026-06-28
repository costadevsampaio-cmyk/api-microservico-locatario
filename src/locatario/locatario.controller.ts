import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LocatarioService } from './locatario.service';

import { CreateLocatarioDto } from './dto/create-locatario.dto';
import { UpdateLocatarioDto } from './dto/update-locatario.dto';
import { QueryLocatarioDto } from './dto/query-locatario.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Locatário')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('locatarios')
export class LocatarioController {
  constructor(private readonly service: LocatarioService) {}

  // -----------------------------
  // LISTAR COM PAGINAÇÃO + FILTROS
  // -----------------------------
  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Listar locatários com paginação e filtros' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'email', required: false })
  findAll(@Query() query: QueryLocatarioDto) {
    return this.service.findAll(query);
  }

  // -----------------------------
  // BUSCAR POR ID
  // -----------------------------
  @Get(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Buscar locatário por ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  // -----------------------------
  // CRIAR LOCATÁRIO
  // -----------------------------
  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Criar novo locatário (PF ou PJ)' })
  @ApiBody({ type: CreateLocatarioDto })
  @ApiResponse({ status: 201 })
  create(@Body() body: CreateLocatarioDto) {
    return this.service.create(body);
  }

  // -----------------------------
  // ATUALIZAR LOCATÁRIO
  // -----------------------------
  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualizar locatário' })
  @ApiBody({ type: UpdateLocatarioDto })
  @ApiResponse({ status: 200 })
  update(
    @Param('id') id: string,
    @Body() body: UpdateLocatarioDto,
  ) {
    return this.service.update(Number(id), body);
  }
}