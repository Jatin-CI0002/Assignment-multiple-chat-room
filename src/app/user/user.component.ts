import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { User } from '../models/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  newChannel: string = '';
  channels:Channel[] = [];
  currentChannel!: Channel;
  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
  this.channels = this.userService.getAllChannels();
  this.currentChannel = this.channels[0];
  }

  joinChannel(){
    let channel = this.userService.joinChannel(this.user.id, this.newChannel)
    this.currentChannel = channel;
    this.newChannel = '';
    console.log(channel);
  }

  selectChannel(channel:Channel){
    this.currentChannel = channel;
  }

}
