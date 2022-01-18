import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[lseContent]'
})
export class LoadingSuccessErrorContentDirective {
  @Input() lseContent!: 'success' | 'error'
  constructor(public templateRef: TemplateRef<unknown>) { }
}
