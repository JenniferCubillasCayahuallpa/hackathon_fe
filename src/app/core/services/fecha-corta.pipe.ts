import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaCorta'
})
export class FechaCortaPipe implements PipeTransform {
  private meses = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  transform(value: string | Date | undefined | null): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    const dia = ('0' + date.getDate()).slice(-2);
    const mes = this.meses[date.getMonth()];
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }
}