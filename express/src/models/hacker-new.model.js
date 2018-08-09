const mongoose = require('mongoose');
const lodash = require('lodash');

const hackerNewModel = new mongoose.Schema(
  {
    created_at: Date,
    title: { type: String, index: true },
    url: String,
    author: String,
    story_url: String,
    objectID: String,
    deleted: { type: Boolean, default: false }
  },
  { versionKey: false }
);

const validProps = Object.keys(hackerNewModel.paths);

hackerNewModel.method('updateProps', function (newData) {
  lodash.merge(this, lodash.pick(newData, validProps));
});

hackerNewModel.method('updateAndSave', function (newData) {
  const title = newData.story_title || newData.title;

  if (!title) { return; }

  this.updateProps(newData);
  return this.save();
});

module.exports = mongoose.model('hackerNewModel', hackerNewModel);
