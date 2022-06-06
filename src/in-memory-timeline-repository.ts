import { Timeline } from './timeline';
import { TimelineRepository } from './timeline-repository';

export class InMemoryTimelineRepository implements TimelineRepository {
  private readonly timelinesByUser = new Map<string, Timeline>();

  getUserTimeline(user: string): Promise<Timeline | undefined> {
    const timeline = this.timelinesByUser.get(user);

    return Promise.resolve(timeline);
  }

  saveTimeline(timeline: Timeline): Promise<void> {
    this.timelinesByUser.set(timeline.owner, {
      ...timeline,
    });

    return Promise.resolve();
  }

  givenTimeline(timeline: Timeline) {
    this.timelinesByUser.set(timeline.owner, timeline);
  }
}
