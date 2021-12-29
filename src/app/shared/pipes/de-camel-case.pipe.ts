import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deCamelCase'
})
export class DeCamelCasePipe implements PipeTransform {

  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.replace(/([A-Z])/g, (_, group) => " " + group).slice(1);
  }

}
