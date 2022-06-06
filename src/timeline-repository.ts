import { Timeline } from './timeline';

export interface TimelineRepository {
  getUserTimeline(user: string): Promise<Timeline | undefined>;
  saveTimeline(timeline: Timeline): Promise<void>;
}
