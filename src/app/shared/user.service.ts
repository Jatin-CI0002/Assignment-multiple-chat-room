import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  message$ : Observable<Message>;

  constructor(private appService:AppService){
    this.message$ = appService.message$;
  }

  joinChannel(userId:number,name:string){
    return this.appService.joinChannel(name, userId);
  }

  getAllChannels(){
    return this.appService.getAllChannels();
  }

  getMessage(channelName:string, userId:number){
    return this.appService.getAllMessages().filter(message => message.channel == channelName)
  }

  sendMessage(userId:number,messageBody:string,channelName:string){
    return this.appService.spreadMessage(userId,messageBody,channelName);
  }
}
