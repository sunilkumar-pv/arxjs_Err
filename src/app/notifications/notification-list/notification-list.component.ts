import { Component, OnInit } from '@angular/core';
import { NotificationsService, Command } from '../notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  messages: Observable<Command[]>;
  
  constructor(private notificaitonsService : NotificationsService) {
    this.messages = notificaitonsService.messagesOutput;

    // setInterval(()=> {
    //  this.notificaitonsService.addSuccess(' success ');
    // }, 2000);

   }


  ngOnInit(): void {

  }

  clearMessage(id: number) {
    this.notificaitonsService.clearMessage(id);
  }

}
