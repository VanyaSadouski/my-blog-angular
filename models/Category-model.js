var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema(
  {
    id: String,
    catName: String,
    catDesc: String,
    catImgUrl: String,
    updated: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    collection: "CategoriesCollection"
  }
);

module.exports = mongoose.model("category", CategorySchema);
