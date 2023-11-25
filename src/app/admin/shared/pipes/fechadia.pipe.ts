import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechadia'
})
export class FechadiaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    console.log("value",value)
    // obtenemos el numero day de la fecha
    let date = new Date(value)
    // le aumentamos un dia porque no viene
    // date.setDate(date.getDate() + 1);
    let day = date.getDate()
    console.log("day",day)
    return day;

  }

}
