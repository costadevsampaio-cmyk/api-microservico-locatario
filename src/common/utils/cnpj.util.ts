export function cleanCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}