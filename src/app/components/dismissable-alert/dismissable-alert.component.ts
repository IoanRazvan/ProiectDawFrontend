import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dismissable-alert',
    templateUrl: './dismissable-alert.component.html'
})
export class DismissableAlertComponent {
    @Input() text!: string;
    @Output() onDismiss = new EventEmitter<any>();

    onClick() {
        this.onDismiss.emit();
    }
}