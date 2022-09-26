import { Component, Input, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { Channel } from '../models/channel';
import { Message } from '../models/message';
import { User } from '../models/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() channel!: Channel;
  @Input() user!: User;
  @Input() userName:string = '';
  isMember:boolean = false;
  newMessage: string = '';
  messages: Message[] = [];
  subscribe!: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscribe = this.userService.message$
      .pipe(filter((message) => message.channel === this.channel.name))
      .subscribe((message) => this.saveMessage(message));
  }

  ngOnChanges(){
    let isContaining = false;
    this.channel.users.map(userId=>{
      if(userId == this.user.id)
        isContaining = true;
    })

    if(isContaining)
    {
      this.isMember = true;
      this.loadMessages();
    }
    else
      this.isMember = false;
  }
  sendMessage() {
    this.userService.sendMessage(this.user.id,this.newMessage,this.channel.name)
    this.newMessage = '';
  }

  joinChannel() {
    this.userService.joinChannel(this.user.id,this.channel.name);
    this.isMember = true;
    this.loadMessages();
  }

  loadMessages(){
    this.messages = this.userService.getMessage(this.channel.name, this.user.id);
  }
  saveMessage(message: Message) {
    this.messages.push(message);
  }
}
