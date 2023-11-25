import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechames'
})
export class FechamesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    // obtenemos el mes en fecha corta
    let date = new Date(value)
    let month = date.toLocaleString('default', { month: 'short' });
    console.log("month",month)
    return month;
  }

}
