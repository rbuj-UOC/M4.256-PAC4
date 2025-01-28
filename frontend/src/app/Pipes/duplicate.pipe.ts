import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicate',
  standalone: false
})
export class DuplicatePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value * 2;
  }
}
