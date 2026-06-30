import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { LocatarioService } from './locatario.service';

import { CreateLocatarioDto } from './dto/create-locatario.dto';
import { UpdateLocatarioDto } from './dto/update-locatario.dto';
import { QueryLocatarioDto } from './dto/query-locatario.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Locatário')
@Controller('locatarios')
export class LocatarioController {
  constructor(private readonly locatarioService: LocatarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar locatários com paginação e filtros' })
  @ApiResponse({ status: 200, description: 'Lista de locatários retornada com sucesso.' })
  async findAll(@Query() query: QueryLocatarioDto) {
    return this.locatarioService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um locatário pelo ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do Locatário' })
  @ApiResponse({ status: 200, description: 'Locatário encontrado.' })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.locatarioService.findOne(BigInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo locatário (Pessoa Física ou Jurídica)' })
  @ApiBody({ type: CreateLocatarioDto })
  @ApiResponse({ status: 201, description: 'Locatário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de validação incorretos.' })
  async create(@Body() createLocatarioDto: CreateLocatarioDto) {
    return this.locatarioService.create(createLocatarioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um locatário' })
  @ApiParam({ name: 'id', type: String, description: 'ID do Locatário' })
  @ApiBody({ type: UpdateLocatarioDto })
  @ApiResponse({ status: 200, description: 'Locatário atualizado com sucesso.' })
  async update(
    @Param('id') id: string,
    @Body() updateLocatarioDto: UpdateLocatarioDto,
  ) {
    return this.locatarioService.update(BigInt(id), updateLocatarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft Delete: Alterar o status do locatário para INATIVO' })
  @ApiParam({ name: 'id', type: String, description: 'ID do Locatário' })
  @ApiResponse({ status: 200, description: 'Locatário inativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async softDelete(@Param('id') id: string) {
    return this.locatarioService.softDelete(BigInt(id));
  }

  @Patch(':id/reativar')
  @ApiOperation({ summary: 'Reativar um locatário alterando o status para ATIVO' })
  @ApiParam({ name: 'id', type: String, description: 'ID do Locatário' })
  @ApiResponse({ status: 200, description: 'Locatário reativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async reativar(@Param('id') id: string) {
    return this.locatarioService.reativar(BigInt(id));
  }
}