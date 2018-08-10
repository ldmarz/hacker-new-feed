// Modules
const compose = require('compose-middleware').compose;
const https = require('https');
const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const Promise = require('bluebird');

// Middlewares
const response = require('../middlewares/response.middleware');

// Models
const HackerNewModel = require('../models/hacker-new.model');

// Public Methods
module.exports.getList = compose([getList, response]);
module.exports.deleteItem = compose([deleteItem, response]);
module.exports.schedulleDataRecolector = schedulleDataRecolector;

async function getList(req, res, next) {
  const data = await HackerNewModel.find({ deleted: false }).sort('-created_at');
  res.payload = data;

  next();
}

async function deleteItem(req, res, next) {
  const post = await HackerNewModel.findOne({ _id: req.body._id });
  post.deleted = true;

  await post.updateAndSave(post);

  res.payload = post;
  next();
}

function schedulleDataRecolector() {
  const timer = process.env.TIMER || 3600000;
  https.get(url, saveResponseInDatabase);

  console.log(`Recolecting data every each ${timer} ms`);
  setTimeout(() => {
    https.get(url, saveResponseInDatabase);
    schedulleDataRecolector();
  }, timer);
}

function saveResponseInDatabase(resp) {
  const { statusCode } = resp;
  let rawData = '';

  if (statusCode !== 200) {
    console.error('Request Failed.\n' + `Status Code: ${statusCode}`);
  }

  resp.on('data', chunk => {
    if (chunk) {
      rawData += chunk;
    }
  });

  resp.on('end', () => {
    saveDataInDatabase(rawData);
  });
}

function saveDataInDatabase(rawData) {
  try {
    const parsedData = JSON.parse(rawData);
    Promise.each(parsedData.hits, async eachHit => {
      eachHit.title = eachHit.story_title || eachHit.title;
      eachHit.url = eachHit.story_url || eachHit.url;

      if (!eachHit.title) { return; }

      const post = await HackerNewModel.findOne({ title: eachHit.title });

      if (post && post.deleted === false) {
        return post.updateAndSave(eachHit);
      } else if (!post) {
        const newHackerNewModel = new HackerNewModel(eachHit);
        return newHackerNewModel.save();
      }
    });
  } catch (e) {
    console.error(e.message);
  }
}
