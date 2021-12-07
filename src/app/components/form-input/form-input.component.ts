import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'form-input',
    templateUrl: './form-input.component.html'
})
export class FormInputComponent {
    @Input() inputModel!: FormControl;
    @Input() name!: string;
    @Input() type: 'text' | 'password' = 'text';
    @Input() errorMessage!: string;
}