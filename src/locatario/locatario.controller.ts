import {
  Controller,
 Get,
  Post,
  Body,
  Param,
  Patch,
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
} from '@nestjs/swagger';

@ApiTags('Locatário')
@Controller('locatarios')
export class LocatarioController {
}