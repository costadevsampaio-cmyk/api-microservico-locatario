import { IsOptional, IsEnum, IsString, IsNumberString } from 'class-validator';
import { TipoPessoa } from './create-locatario.dto';
import { Status } from '@prisma/client';

export class QueryLocatarioDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(TipoPessoa)
  tipo?: TipoPessoa;

  @IsOptional()
  @IsString()
  email?: string;
}