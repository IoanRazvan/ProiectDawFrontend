import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Genre } from 'src/app/models/genre.model';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'book-form-genre-select',
  templateUrl: './book-form-select.component.html'
})
export class BookFormSelectComponent implements OnInit {
  @Input() inputModel!: AbstractControl;
  loading: boolean = true;
  genres: Genre[] = [];
  errorMessage: string = '';

  constructor(private uploadsService: UploadsService) { }

  ngOnInit() {
    this.uploadsService.getGenres().subscribe({
      next: (genres) => { this.loading = false; this.genres = genres; },
      error: () => {this.loading = false; this.errorMessage = 'Unable to fetch genres.'}
    })
  }

  compareFunction(genre1: Genre, genre2: Genre) {
    return genre1 && genre2 ? genre1.id === genre2.id : false;
  }
}
