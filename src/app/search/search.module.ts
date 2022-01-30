import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchService } from './services/search.service';
import { BooksSearchBarComponent } from './components/boks-search-bar/books-search-bar.component';
import { OrderingSectionComponent } from './components/ordering-section/ordering-section.component';
import { ResultSectionComponent } from './components/result-section/result-section.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchComponent,
    BooksSearchBarComponent,
    OrderingSectionComponent,
    ResultSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SearchComponent
  ],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
