import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

export class CreateLocatarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  endereco: string;

  @IsOptional()
  telefone?: string;

  @IsEnum(TipoPessoa)
  tipo: TipoPessoa;

  // Pessoa Física
  @IsOptional()
  nome?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  rg?: string;

  @IsOptional()
  estadoCivil?: string;

  @IsOptional()
  profissaoRamo?: string;

  // Pessoa Jurídica
  @IsOptional()
  razaoSocial?: string;

  @IsOptional()
  cnpj?: string;

  @IsOptional()
  inscricaoEstadual?: string;
}