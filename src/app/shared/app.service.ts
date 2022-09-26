import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Channel } from '../models/channel';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  usersArray: User[];
  channelsArray: Channel[];
  messagesArray: Message[];

  constructor() {
    this.usersArray = [];
    this.channelsArray = [
      {
        name: 'general',
        owner: 0,
        users: this.usersArray.map((user) => user.id),
      },
    ];
    this.messagesArray = [];
  }

  getUser(name: string) {
    let requiredUser =
      this.usersArray.find((user) => user.name == name) ??
      this.createUser(name);
    return requiredUser;
  }

  createUser(name: string) {
    let newUser: User = {
      id: Date.now() + Math.floor(1000 + Math.random() * 9000),
      name: name,
    };
    this.usersArray.push(newUser);
    this.channelsArray[0].users.push(newUser.id);
    return newUser;
  }

  joinChannel(name: string, userId: number) {
    let channel: Channel;
    let channelIndex = this.channelsArray.findIndex((channel) => {
      return channel.name === name;
    });

    if (channelIndex === -1) {
      channel = this.createChannel(name, userId);
    } else {
      this.channelsArray[channelIndex].users.push(userId);
      channel = this.channelsArray[channelIndex];
    }
    return channel;
  }

  createChannel(name: string, userId: number) {
    let newChannel = {
      name: name,
      owner: userId,
      users: [userId],
    };

    this.channelsArray.push(newChannel);
    return newChannel;
  }
  getAllUsers() {
    return this.usersArray;
  }

  getAllChannels() {
    return this.channelsArray;
  }

  getAllMessages() {
    return this.messagesArray;
  }

  message$ = new Subject<Message>();

  spreadMessage(userId:number, messageBody:string, channelName:string){
    let message = {
      id: Date.now(),
      time: new Date(),
      sender:userId,
      body:messageBody,
      channel:channelName
    }

    this.messagesArray.push(message);
    this.message$.next(message);
  }
}
