import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit',
})
export class ConvertUnitPipe implements PipeTransform {
  private units: string[] = ['MB', 'GB', 'TB'];
  transform(value: number | undefined, isSpeed: boolean = false): string {
    if (!value)
      return `<div class='number'>0</div><div class='unit'>kB${
        isSpeed ? '/s' : ''
      }</div>`;
    for (let i = this.units.length; i > 0; i--) {
      const num = value / 1024 ** (i + 1);
      if (Math.floor(num) > 0) {
        return `<div class='number'>${num.toFixed(2)}</div><div class='unit'>${
          this.units[i - 1]
        }${isSpeed ? '/s' : ''}</div>`;
      }
    }
    return `<div class='number'>${Math.floor(
      value / 1024
    )}</div><div class='unit'>kB${isSpeed ? '/s' : ''}</div>`;
  }
}
