const FeedService = require("../services/FeedService");

module.exports = {
  inputs: {
    categoryPath: sails.config.inputs.entities.categoryPath,
    limit: sails.config.inputs.fields.limit,
    offset: sails.config.inputs.fields.offset,
    includeSlideshow: sails.config.inputs.fields.includeSlideshow,
    json: sails.config.inputs.fields.json,
  },

  exits: {
    success: sails.config.exits.api,
    html: {
      responseType: "view",
      viewTemplatePath: "pages/public/v2/stories",
      description: "HTML response for stories page.",
    },
    internalServerError: {
      responseType: "serverError",
      description: "When an unexpected error occurs.",
    },
    internalServerErrorHTML: sails.config.exits.internalServerErrorHTML,
  },

  fn: async function (inputs, exits) {
    try {
      const requestedCategory = {
        title: "Stories",
        slug: inputs.categoryPath || "stories",
      };
      const bgImage = "/images/default-share-image.jpg";

      const LIMIT =
        this.req.wantsHTML && !inputs.json
          ? 11
          : typeof inputs.limit === "number"
          ? inputs.limit
          : 10;
      const OFFSET = typeof inputs.offset === "number" ? inputs.offset : 0;

      const stories = await FeedService.getTopStories({
        username: this.req.user ? this.req.user.username : "guest",
        limit: LIMIT,
        offset: OFFSET,
      });

      if (this.req.wantsJSON || inputs.json) {
        return exits.success({ stories });
      }

      return exits.html({
        layout: "layouts/v2/topicsFeed",
        title: sails.config.content.pages.topicFeed.title(
          requestedCategory.title
        ),
        shareImageURL:
          sails.config.content.pages.topicFeed.share.image.url(bgImage),
        requestedCategory: requestedCategory,
        stories: stories,
        activeRoute: "/stories",
        user: this.req.user,
      });
    } catch (err) {
      sails.log.error(this.req.logCtx, "Error while GET category feed: ", err);
      if (this.req.wantsJSON || inputs.json) {
        return exits.internalServerError();
      }
      return exits.internalServerErrorHTML({ error: err });
    }
  },
};
