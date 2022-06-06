describe('Feature: Publishing a message', () => {
  let sut: Sut;
  describe('Rule: A user can publish message on her personnal timeline', () => {
    beforeEach(() => {
      sut = createSut();
    });

    test('Example: Alice post a message on her empty timeline', async () => {
      sut.givenTimeline({
        owner: 'alice',
        messages: [],
      });

      sut.whenUserPostsTheMessage({
        user: 'alice',
        message: 'Hello World !',
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

const createSut = () => {};

type Sut = ReturnType<typeof createSut>;
