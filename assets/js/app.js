const { createApp, ref, computed } = Vue;

const StoryCardComponent = {
  props: ["story"],
  template: `
        <div class="story-card">
            <template v-if="story.preview">
                <img :src="story.preview" :alt="story.title + ' preview'" loading="lazy">
            </template>
            <div class="story-card-content">
                <h3>{{ story.title }}</h3>
                <p>Published: {{ story.publish_date }}</p>
                <template v-if="story.author">
                    <div class="author-info">
                        <template v-if="story.author.avatar">
                            <img :src="story.author.avatar" :alt="story.author.username + ' avatar'" class="author-avatar">
                        </template>
                        <span>By {{ story.author.username }}</span>
                    </div>
                </template>
            </div>
        </div>
    `,
};

const app = createApp({
  components: {
    "story-card": StoryCardComponent,
  },
  setup() {
    const stories = ref(window.initialStories || []);
    const offset = ref(stories.value.length);
    const isLoading = ref(false);
    const TOTAL_MOCK_STORIES = 50;

    const hasMore = computed(() => {
      return stories.value.length < TOTAL_MOCK_STORIES;
    });
    const loadMoreStories = async () => {
      if (isLoading.value) return;
      isLoading.value = true;

      try {
        const response = await fetch(
          `/stories?json=true&limit=10&offset=${offset.value}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.stories && data.stories.length > 0) {
          stories.value = [...stories.value, ...data.stories];
          offset.value += data.stories.length;
        } else {
        }
      } catch (error) {
        console.error("Error loading more stories:", error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      stories,
      hasMore,
      isLoading,
      loadMoreStories,
    };
  },
});

app.mount("#stories-app");
