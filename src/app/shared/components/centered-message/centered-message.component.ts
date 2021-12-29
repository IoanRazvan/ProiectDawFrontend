import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'centered-message',
  templateUrl: './centered-message.component.html'
})
export class CenteredMessageComponent {
  @Input() text!: string;
}
