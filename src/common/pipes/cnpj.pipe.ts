import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CnpjPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return value;

    const cnpj = value.replace(/\D/g, '');

    if (cnpj.length !== 14) {
      throw new BadRequestException('CNPJ inválido');
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      throw new BadRequestException('CNPJ inválido');
    }

    let size = 12;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) {
      throw new BadRequestException('CNPJ inválido');
    }

    size = 13;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(1))) {
      throw new BadRequestException('CNPJ inválido');
    }

    return cnpj;
  }
}