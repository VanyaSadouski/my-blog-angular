var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    postTitle: String,
    postDesc: String,
    postContent: String,
    postImgUrl: String,
    likes: Number,
    likedByUsers: Array,
    created: { type: Date },
    updated: { type: Date, default: Date.now },
    comments: [],

  },
  {
    versionKey: false,
    collection: "PostsCollection"
  }
);

module.exports = mongoose.model("post", PostSchema);
