import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchAll, tap } from 'rxjs';
import { LibraryService } from 'src/app/core/services/library.service';
import { Library } from 'src/app/models/library.model';

@Component({
  selector: 'library-assignment',
  templateUrl: './library-assignment.component.html',
})
export class LibraryAssignmentComponent implements OnInit {
  @Input() label!: string;
  loading = true;
  error!: string;
  libraries!: Library[];
  initialLibraries!: Library[];
  currentLibraries!: Library[];
  bookId!: string;
  updating = false;


  constructor(private route: ActivatedRoute, private service: LibraryService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(({id}) => this.bookId = id),
      map(({id}) => this.service.getLibraries(id)),
      switchAll()
    ).subscribe({
      next: (response : any) => {
        this.libraries = response.libraries;
        this.initialLibraries = response.selectedLibraries;
        this.currentLibraries = [...this.initialLibraries];
        this.loading = false;
      },
      error: () => {
        this.error = "Unable to load libraries";
        this.loading = false;
      }
    })
  }

  onUpdateLibraries() {
    this.updating = true;
    let toRemove = this.initialLibraries.filter(initialLib => !this.currentLibraries.some(currentLib => currentLib.id === initialLib.id)).map((lib : any) => lib.id);
    let toAdd = this.currentLibraries.filter(currentLib => !this.initialLibraries.some(initialLib => initialLib.id === currentLib.id)).map((lib : any) => lib.id);
    this.service.updateLibraryAssignment({
      entityId: this.bookId,
      added: toAdd,
      removed: toRemove
    }).subscribe({
      next: (updatedLibs) => {
        this.initialLibraries = updatedLibs;
        this.currentLibraries = [...updatedLibs];
        this.updating = false;
      },
      error: (err) => {
        this.updating = false;
      }
    });
  }
}
