import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ReviewService } from 'src/app/core/services/review.service';
import { Page } from 'src/app/models/page.model';
import { PostedReview, ReviewData } from 'src/app/models/review.model';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html'
})
export class CommentsSectionComponent {
    loadingForm: boolean = true;
    loadingReviews: boolean = true;
    showForm!: boolean;
    page!: Page<PostedReview>;
    submittingReview = false;
    @Output() onPost: EventEmitter<ReviewData> = new EventEmitter<ReviewData>();

    constructor(public service: ReviewService, private route : ActivatedRoute) {
    }

    ngOnInit() {
      this.route.params.pipe(
        switchMap(({id}) => this.service.getReviews(id, 0, 4)),
      ).subscribe((resp) => {
        this.loadingReviews = false;
        this.page = resp;
      });

      this.route.params.pipe(
        switchMap(({id}) => this.service.canReview(id)),
      ).subscribe((resp) => {
        this.showForm = resp;
        this.loadingForm = false;
      });
    }

    onReviewPost(reviewData: ReviewData) {
      this.route.params.pipe(
        switchMap(({id}) => this.service.saveReview(id, reviewData))
      ).subscribe((resp) => {
        this.showForm = false;
        if (this.page.currentPageNumber == 0)
          this.page = {
            ...this.page,
            result: [resp].concat(this.page.result)
          }
        this.onPost.emit(reviewData);
      })
    }

    onPageChange(page: number) {
      this.loadingReviews = true;
      this.route.params.pipe(
        switchMap(({id}) => this.service.getReviews(id, page - 1, 4)),
      ).subscribe((resp) => {
        this.loadingReviews = false;
        this.page = resp;
      });
    }
}
