import { Message } from './message';

export type Timeline = {
  owner: string;
  messages: Message[];
};
