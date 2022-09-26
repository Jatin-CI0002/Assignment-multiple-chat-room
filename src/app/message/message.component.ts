import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  @Input() message!:Message;
  @Input() user:string = '';
  userName = '';
  side:boolean = false;
  constructor(private appService:AppService){}
  ngOnInit(){
  this.userName = this.appService.getAllUsers().find(user => user.id === this.message.sender)?.name || "";
  this.side = this.userName == this.user;
  }


}
