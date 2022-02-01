import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewData } from 'src/app/models/review.model';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent {
  @Input() noRows: number = 4;
  @Input() submitting: boolean = false;
  @Output() onPost: EventEmitter<ReviewData> = new EventEmitter<ReviewData>();
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      score: [0, Validators.compose([Validators.required, Validators.min(1)])],
      comment: ['']
    });
  }

  onPostClick() {
    this.onPost.emit(this.form.value);    
  }
}
