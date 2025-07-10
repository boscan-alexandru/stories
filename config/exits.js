module.exports.exits = {
  api: {
    responseType: "ok",
    description: "Standard API success response.",
  },
  html: {
    responseType: "view",
    viewTemplatePath: "pages/public/v2/stories",
    description: "HTML response for stories page.",
  },
  internalServerErrorHTML: {
    responseType: "view",
    viewTemplatePath: "500",
    description: "Server error HTML response.",
  },
};
