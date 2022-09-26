import { User } from "./user"
import { Channel } from "./channel"

export interface Message{
  time:Date,
  body:string,
  sender:User['id'],
  channel:Channel['name']
  id:number
}
