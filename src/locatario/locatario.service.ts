import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  CreateLocatarioDto,
  TipoPessoa,
} from './dto/create-locatario.dto';

import { UpdateLocatarioDto } from './dto/update-locatario.dto';
import { QueryLocatarioDto } from './dto/query-locatario.dto';

import { CpfPipe } from '../common/pipes/cpf.pipe';
import { CnpjPipe } from '../common/pipes/cnpj.pipe';

@Injectable()
export class LocatarioService {
  constructor(private readonly prisma: PrismaService) {}

  //----------------------------------------
  // LISTAR
  //----------------------------------------

  async findAll(query: QueryLocatarioDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = {
      status: query.status,
      email: query.email
        ? {
            contains: query.email,
          }
        : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.locatario.findMany({
        skip,
        take: limit,
        where,
        include: {
          pessoaFisica: true,
          pessoaJuridica: true,
        },
        orderBy: {
          id: 'desc',
        },
      }),

      this.prisma.locatario.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  //----------------------------------------
  // BUSCAR POR ID
  //----------------------------------------

  async findOne(id: bigint) {
    const locatario = await this.prisma.locatario.findUnique({
      where: {
        id,
      },
      include: {
        pessoaFisica: true,
        pessoaJuridica: true,
      },
    });

    if (!locatario) {
      throw new NotFoundException('Locatário não encontrado');
    }

    return locatario;
  }

  //----------------------------------------
  // CRIAR
  //----------------------------------------

  async create(data: CreateLocatarioDto) {
    const cpfPipe = new CpfPipe();
    const cnpjPipe = new CnpjPipe();

    if (data.tipo === TipoPessoa.FISICA) {
      if (!data.nome || !data.cpf) {
        throw new BadRequestException(
          'Pessoa Física requer nome e CPF',
        );
      }

      data.cpf = cpfPipe.transform(data.cpf);
    }

    if (data.tipo === TipoPessoa.JURIDICA) {
      if (!data.razaoSocial || !data.cnpj) {
        throw new BadRequestException(
          'Pessoa Jurídica requer Razão Social e CNPJ',
        );
      }

      data.cnpj = cnpjPipe.transform(data.cnpj);
    }

    return this.prisma.$transaction(async (tx) => {
      /**
       * TEMPORÁRIO
       *
       * Amanhã, quando o professor colocar
       * AUTO_INCREMENT no banco,
       * este bloco será removido.
       */
      const ultimo = await tx.locatario.findFirst({
        orderBy: {
          id: 'desc',
        },
      });

      const novoId = ultimo
        ? BigInt(ultimo.id) + BigInt(1)
        : BigInt(1);

      const locatario = await tx.locatario.create({
        data: {
          id: novoId,
          email: data.email,
          endereco: data.endereco,
          telefone: data.telefone,
        },
      });

      if (data.tipo === TipoPessoa.FISICA) {
        await tx.pessoaFisica.create({
          data: {
            locatarioId: locatario.id,
            nome: data.nome!,
            cpf: data.cpf!,
            rg: data.rg,
            estadoCivil: data.estadoCivil,
            profissaoRamo: data.profissaoRamo,
          },
        });
      } else {
        await tx.pessoaJuridica.create({
          data: {
            locatarioId: locatario.id,
            razaoSocial: data.razaoSocial!,
            cnpj: data.cnpj!,
            inscricaoEstadual: data.inscricaoEstadual,
          },
        });
      }

      return tx.locatario.findUnique({
        where: {
          id: locatario.id,
        },
        include: {
          pessoaFisica: true,
          pessoaJuridica: true,
        },
      });
    });
  }

  //----------------------------------------
  // ATUALIZAR
  //----------------------------------------

  async update(
    id: bigint,
    data: UpdateLocatarioDto,
  ) {
    await this.findOne(id);

    return this.prisma.locatario.update({
      where: {
        id,
      },
      data,
    });
  }

  //----------------------------------------
  // SOFT DELETE (DESATIVAR)
  //----------------------------------------

  async softDelete(id: bigint) {
    await this.findOne(id); // Garante que existe ou joga 404

    return this.prisma.locatario.update({
      where: {
        id,
      },
      data: {
        status: 'INATIVO',
      },
    });
  }

  //----------------------------------------
  // REATIVAR
  //----------------------------------------

  async reativar(id: bigint) {
    await this.findOne(id); // Garante que existe ou joga 404

    return this.prisma.locatario.update({
      where: {
        id,
      },
      data: {
        status: 'ATIVO',
      },
    });
  }

  //----------------------------------------
  // REMOVER (HARD DELETE)
  //----------------------------------------

  async remove(id: bigint) {
    await this.findOne(id);

    return this.prisma.locatario.delete({
      where: {
        id,
      },
    });
  }
}