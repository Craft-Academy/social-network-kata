import { TimelineRepository } from './timeline-repository';

export class PublishMessage {
  constructor(private readonly timelineRepository: TimelineRepository) {}

  async handle(message: { author: string; text: string }) {
    const timeline = await this.timelineRepository.getUserTimeline(
      message.author
    );
    if (!timeline) {
      throw new Error('no timeline');
    }
    timeline.messages.push(message);

    return this.timelineRepository.saveTimeline(timeline);
  }
}
