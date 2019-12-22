var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    id: String,
    postTitle: String,
    postDesc: String,
    postContent: String,
    postImgUrl: String,
    likes: Number,
    created: { type: Date },
    updated: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    collection: "PostsCollection"
  }
);

module.exports = mongoose.model("post", PostSchema);
