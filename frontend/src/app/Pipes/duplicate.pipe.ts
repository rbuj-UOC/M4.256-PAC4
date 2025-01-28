import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicate',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class DuplicatePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value * 2;
  }
}
