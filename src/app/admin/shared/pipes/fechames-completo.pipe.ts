import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechamesCompleto'
})
export class FechamesCompletoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let date = new Date(value)
    let month = date.toLocaleString('default', { month: 'long' });
    console.log("month",month)
    return month;
  }

}
