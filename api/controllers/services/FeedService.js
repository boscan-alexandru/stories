class FeedService {
  constructor() {
    this.name = "FeedService";
  }
  async getTopStories({ username, limit, offset }) {
    sails.log.info(
      `FeedService: Fetching stories for ${username}, limit=${limit}, offset=${offset}`
    );

    const allStories = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Story Title ${i + 1}`,
      preview: `https://picsum.photos/seed/${i + 1}/400/250`,
      publish_date: new Date(
        Date.now() - i * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: {
        username: `author${(i % 5) + 1}`,
        avatar: `https://i.pravatar.cc/50?img=${(i % 10) + 1}`,
      },
    }));

    const start = offset;
    const end = offset + limit;
    const storiesSlice = allStories.slice(start, end);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return storiesSlice;
  }
}

module.exports = new FeedService();
