const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = process.env.DB_CONNECTION;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_MOVIES = process.env.COLLECTION_MOVIES;

function initialize(
  successCallback,
  failureCallback
) {
  MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err);
    } else {
      const dbObject = dbInstance.db(DB_NAME);
      const dbCollection = dbObject.collection(COLLECTION_MOVIES);
      console.log("[MongoDB connection] SUCCESS");
      successCallback(dbCollection);
    }
  });
}

module.exports = { initialize };