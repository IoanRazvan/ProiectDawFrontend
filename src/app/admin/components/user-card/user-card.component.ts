import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AdminEditableUser, UserEvent, UserEventType } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  faUserShield = faUserShield;
  @Input() user!: AdminEditableUser;
  @Output() userEvent: EventEmitter<UserEvent> = new EventEmitter<UserEvent>();


  emitEvent(type: UserEventType) {
    this.userEvent.emit({operation: type, id: this.user.id});
  }
}
