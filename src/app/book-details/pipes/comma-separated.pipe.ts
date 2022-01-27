import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';

@Pipe({
  name: 'commaSeparated'
})
export class CommaSeparatedPipe implements PipeTransform {

  transform(genres: Genre[]): string {
    return genres.map(genre => genre.title).join(', ');
  }

}
