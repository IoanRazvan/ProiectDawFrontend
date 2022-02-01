import { Component, Input } from '@angular/core';
import { PostedReview } from 'src/app/models/review.model';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html'
})
export class CommentCardComponent {
  @Input() review!: PostedReview;
}
