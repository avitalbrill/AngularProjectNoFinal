import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avital',
  standalone: true
})
export class AvitalPipe implements PipeTransform {
  transform(value: string): string {
    // הוספת אייקון דוקטור לפני שם הרופא
    const doctorEmoji = '👨‍⚕️'; // אייקון של רופא
    return `${doctorEmoji} ${value}`;
  }
}

