import { InMemoryTimelineRepository } from '../src/in-memory-timeline-repository';
import { Message } from '../src/message';
import { Timeline } from '../src/timeline';

describe('Feature: Publishing a message', () => {
  let sut: Sut;
  describe('Rule: A user can publish message on her personnal timeline', () => {
    beforeEach(() => {
      sut = createSut();
    });

    test('Example: Alice posts a message on her empty timeline', async () => {
      sut.givenTimeline({
        owner: 'alice',
        messages: [],
      });

      await sut.whenUserPostsTheMessage({
        author: 'alice',
        text: 'Hello World !',
      });

      await sut.thenTimelineShouldBe({
        owner: 'alice',
        messages: [
          {
            author: 'alice',
            text: 'Hello World !',
          },
        ],
      });
    });
  });
});

const createSut = () => {
  const timelineRepository = new InMemoryTimelineRepository();

  return {
    givenTimeline(timeline: Timeline) {
      timelineRepository.givenTimeline(timeline);
    },

    async whenUserPostsTheMessage(message: Message) {
      const timeline = await timelineRepository.getUserTimeline(message.author);
      if (!timeline) {
        throw new Error('no timeline');
      }
      timeline.messages.push(message);

      return timelineRepository.saveTimeline(timeline);
    },

    async thenTimelineShouldBe(expectedTimeline: Timeline) {
      const theTimeline = await timelineRepository.getUserTimeline(
        expectedTimeline.owner
      );

      expect(theTimeline).toEqual(expectedTimeline);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
