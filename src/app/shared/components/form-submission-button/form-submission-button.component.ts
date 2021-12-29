import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'submit-button',
    templateUrl: './form-submission-button.component.html'
})
export class FormSubmissionButtonComponent {
    @Input() submitting!: boolean;
    @Input() disabled!: boolean;
    @Output() onSubmit = new EventEmitter<any>();
    @Input() text: string = "Submit";

    onClick() : boolean {
        this.onSubmit.emit();
        return false;
    }
}