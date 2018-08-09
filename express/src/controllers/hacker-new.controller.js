// Modules
const compose = require('compose-middleware').compose;
const https = require('https');
const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const _ = require('lodash');
const Promise = require('bluebird');

// Middlewares
const response = require('../middlewares/response.middleware');

// Models
const HackerNewModel = require('../models/hacker-new.model');

// Public Methods
module.exports.someFunction = compose([someFunction, response]);
module.exports.schedulleDataRecolector = schedulleDataRecolector;

function someFunction(req, res, next) {
  res.payload = { hola: 'mundo' };
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
    try {
      const parsedData = JSON.parse(rawData);
      Promise.each(parsedData.hits, async eachHit => {
        const post = await HackerNewModel.findOne({ objectID: eachHit.objectID });
        if (post && post.deleted === false) {
          return post.updateAndSave(eachHit);
        } else {
          const newHackerNewModel = new HackerNewModel(eachHit);
          return newHackerNewModel.save();
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  });
}
