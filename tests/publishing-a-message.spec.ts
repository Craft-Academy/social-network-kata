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
  let theTimeline: {
    owner: string;
    messages: { author: string; text: string }[];
  };

  return {
    givenTimeline(timeline: { owner: string; messages: [] }) {
      theTimeline = timeline;
    },

    whenUserPostsTheMessage(message: { author: string; text: string }) {
      theTimeline.messages.push(message);
    },

    thenTimelineShouldBe(expectedTimeline: {
      owner: string;
      messages: { author: string; text: string }[];
    }) {
      expect(theTimeline).toEqual(expectedTimeline);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
