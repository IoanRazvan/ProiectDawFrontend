import { Component, ContentChildren, Input, QueryList, TemplateRef } from "@angular/core";
import { LoadingSuccessErrorContentDirective } from "../../directives/loading-success-error-content/loading-success-error-content.directive";

@Component({
    selector: 'loading-success-error',
    templateUrl: './loading-success-error.component.html'
})
export class LoadingSuccessErrorComponent {
    @Input() loading!: boolean;
    @Input() error!: boolean;
    @ContentChildren(LoadingSuccessErrorContentDirective) contents !: QueryList<LoadingSuccessErrorContentDirective>;

    get errorContentTemplate() : TemplateRef<unknown> {
        return <any>this.contents.find(item => item.lseContent == 'error')?.templateRef;
    }

    get successContentTemplate() : TemplateRef<unknown> {
        return <any>this.contents.find(item => item.lseContent == 'success')?.templateRef;
    }
}