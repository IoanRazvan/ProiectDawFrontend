import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'submit-button',
    templateUrl: './form-submission-button.component.html'
})
export class FormSubmissionButtonComponent {
    @Input() submitting!: boolean;
    @Input() disabled!: boolean;
    @Output() onSubmit = new EventEmitter<any>();

    onClick() {
        this.onSubmit.emit();
    }
}