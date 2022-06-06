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

      sut.whenUserPostsTheMessage({
        author: 'alice',
        text: 'Hello World !',
      });

      sut.thenTimelineShouldBe({
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
  let theTimeline: Timeline;

  return {
    givenTimeline(timeline: Timeline) {
      theTimeline = timeline;
    },

    whenUserPostsTheMessage(message: Message) {
      theTimeline.messages.push(message);
    },

    thenTimelineShouldBe(expectedTimeline: Timeline) {
      expect(theTimeline).toEqual(expectedTimeline);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
