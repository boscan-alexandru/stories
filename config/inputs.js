module.exports.inputs = {
  entities: {
    categoryPath: {
      description: "The path for the category.",
      type: "string",
      defaultsTo: "technology",
    },
  },
  fields: {
    limit: {
      description: "Maximum number of items to return.",
      type: "number",
      defaultsTo: 10,
    },
    offset: {
      description: "Offset for pagination.",
      type: "number",
      defaultsTo: 0,
    },
    includeSlideshow: {
      description: "Whether to include slideshow data.",
      type: "boolean",
      defaultsTo: false,
    },
    json: {
      description: "Return JSON response regardless of accepts header.",
      type: "boolean",
      defaultsTo: false,
    },
  },
};
