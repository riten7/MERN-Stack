const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://riten:yavra@1234@cluster0-sil8n.mongodb.net/test?retryWrites=true&w=majority";
const DB_NAME = "sample_mflix"
const COLLECTION_MOVIES = "riten_movies";

function initialize(
  successCallback,
  failureCallback
) {
  MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err); // this should be "caught" by the calling function
    } else {
      const dbObject = dbInstance.db(DB_NAME);
      const dbCollection = dbObject.collection(COLLECTION_MOVIES);
      console.log("[MongoDB connection] SUCCESS");

      successCallback(dbCollection);
    }
  });
}

module.exports = { initialize };