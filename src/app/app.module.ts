import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
