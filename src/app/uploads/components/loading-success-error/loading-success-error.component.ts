import { Component, Input } from "@angular/core";

@Component({
    selector: 'loading-success-error',
    templateUrl: './loading-success-error.component.html'
})
export class LoadingSuccessErrorComponent {
    @Input() loading!: boolean;
    @Input() error!: boolean;
}