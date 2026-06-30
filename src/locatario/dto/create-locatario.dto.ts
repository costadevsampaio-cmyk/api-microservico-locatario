import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

export class CreateLocatarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsEnum(TipoPessoa)
  tipo: TipoPessoa;

  // ===========================
  // Pessoa Física
  // ===========================

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsOptional()
  @IsString()
  estadoCivil?: string;

  @IsOptional()
  @IsString()
  profissaoRamo?: string;

  // ===========================
  // Pessoa Jurídica
  // ===========================

  @IsOptional()
  @IsString()
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  inscricaoEstadual?: string;
}