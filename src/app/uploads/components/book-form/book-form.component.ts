import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidationConstants } from 'src/app/constants/validation.constants';
import { Book, DEFAULT_BOOK_DATA } from 'src/app/models/book.model';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnChanges, OnInit {
  @Input() bookData!: Book;
  @Input() contetIsRequired: boolean = false;
  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmitSuccessful = new EventEmitter<any>();
  form!: FormGroup;
  isUpdate: boolean = false;
  submitError: string = '';
  submitting: boolean = false;
  validationConstants = ValidationConstants;
  uploadedFile: any = null;
  @ViewChild('file') fileElement!: ElementRef;

  constructor(private fb: FormBuilder, private service: UploadsService) {
  }

  ngOnInit(): void {
      this.isUpdate = !!this.bookData?.id;
      this.populateForm(this.bookData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateForm(changes['bookData']?.currentValue);
    this.uploadedFile = null;
    if (this.fileElement?.nativeElement)
      this.fileElement.nativeElement.value = '';
  }

  private populateForm(bookData: Book) {
    const initialValues = this.prepareInitialValues(bookData);
    console.log(initialValues);

    this.form = this.fb.group({
      'title': [initialValues.title, Validators.required],
      'description': [initialValues.description || ''],
      'coverUrl': [initialValues.coverUrl, Validators.required],
      'authorName': [initialValues.authorName, Validators.required],
      'genres': [initialValues.genres,]
    });
  }

  private prepareInitialValues(bookData: Book) {
    let initialValues = DEFAULT_BOOK_DATA;

    if (bookData)
      initialValues = Object.assign({}, DEFAULT_BOOK_DATA, bookData);
    return initialValues;
  }

  onFileSelected(event: any) {
    this.uploadedFile = event.target?.files[0];
  }

  onCancelClick(): boolean {
    this.onCancel.emit();
    return false;
  }

  onSubmitClick() {
    this.submitting = true;
    let submissionStream: Observable<Book>;
    const data = this.buildFormData();
    console.log(this.form);
    if (this.isUpdate)
      submissionStream = this.service.updateBook(data, <string>this.bookData.id)
    else
      submissionStream = this.service.addBook(data);
    submissionStream.subscribe({
      next: () => { this.submitting = false; this.onSubmitSuccessful.emit(); },
      error: () => { this.submitting = false; this.submitError = 'Form submission error!'; }
    });
  }

  private buildFormData(): FormData {
    const formData = new FormData();
    for (let key in this.form.value) {
      if (this.form.value[key] instanceof Array) {
          formData.append(key, JSON.stringify(this.form.value[key]));
      } else {
        formData.append(key, this.form.value[key]);
      }
    }
    formData.append('content', this.uploadedFile);
    console.log(formData);
    return formData;
  }

  isSubmissionDisabled(): boolean {
    return this.form.invalid || (this.contetIsRequired && !this.uploadedFile);
  }
}