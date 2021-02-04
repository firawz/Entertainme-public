const db = require("./index");

db.createCollection("Movies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "overview", "poster_path", "popularity", "tags"],
      properties: {
        title: {
          bsonType: "string",
          description: "Title must be filled",
        },
        overview: {
          bsonType: "string",
          description: "Overview must be filled",
        },
        poster_path: {
          bsonType: "string",
          description: "Poster_path must be filled and should be URL",
        },
        popularity: {
          bsonType: "double",
          description: "Popularity must be number",
        },
        Tags: {
          bsonType: "array",
          description: "Tags must be filled",
        },
      },
    },
  },
  validationAction: "error",
});
