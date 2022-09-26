import { User } from './user';

export interface Channel {
  name: string;
  owner: User['id'];
  users: User['id'][];
}
