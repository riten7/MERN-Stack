const express = require('express');
const cors = require('cors');
require('dotenv/config');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());

const database = require('./db');
let collection = null;

database.initialize(function (dbCollection) {
  collection = dbCollection;
}, function (err) {
  throw (err);
});

router.get("/getMovies", (request, response) => {
  collection.find().limit(15).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

router.get("/getMovie/:id", (request, response) => {
  const itemId = request.params.id;
  collection.findOne({ id: itemId }, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

router.post("/movie", (request, response) => {
  const item = request.body;
  collection.insertOne(item, (error, result) => { // callback of insert
    if (error) throw error;
    response.json(result.ops);
  });
});

router.put("/movie/:id", (request, response) => {
  const itemId = request.params.id;
  const item = request.body;
  collection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
    if (error) throw error;
    response.json(result);
    // send back entire updated list, to make sure frontend data is up-to-date
    // collection.find().toArray(function (_error, _result) {
    //   if (_error) throw _error;
    //   response.json(_result);
    // });
  });
});

router.delete("/movie/:id", (request, response) => {
  const itemId = request.params.id;
  collection.deleteOne({ id: itemId }, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});

module.exports = router;