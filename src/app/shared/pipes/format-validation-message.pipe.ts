import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValidationMessage'
})
export class FormatValidationMessagePipe implements PipeTransform {

  transform(validationMessage: string, ...args: string[]): string {
    let finalMessage = validationMessage;
    
    for (let arg of args) {
       finalMessage = finalMessage.replace(/{\?}/, arg)
    }

    return finalMessage;
  }

}
