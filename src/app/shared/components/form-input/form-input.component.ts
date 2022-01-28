import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: 'form-input',
    templateUrl: './form-input.component.html'
})
export class FormInputComponent {
    @Input() inputType: 'area' | 'input' = 'input';
    @Input() inputModel!: AbstractControl;
    @Input() name!: string;
    @Input() type: 'text' | 'password' | 'checkbox' | 'number' = 'text';
    @Input() errorMessage!: string;
    @Input() showLabel = true;
    @Input() classes: string[] = ['form-control'];
}