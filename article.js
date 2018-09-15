const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Article = new Schema({
  _id: String,
  title: String,
  excerpt: String,
  url: String,
  date: Date
});

module.exports = mongoose.model('articles', Article);