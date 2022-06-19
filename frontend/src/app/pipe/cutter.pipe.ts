import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutter'
})
export class CutterPipe implements PipeTransform {

  transform(text: string | any, prefix: number): string | null {
    if (!prefix || prefix === 0) return text;
    if (typeof(text) != 'string') return text;
    if (String(text).length < prefix) return text;

    return `${String(text).slice(0, prefix).split(' ').slice(0,-1).join(' ')}...`;

  }

}
