var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/sn';


// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo server");
  db.close();
});

function insertScore(data) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var name = data.name;
    var score = data.score;
    console.log("name: "+ name);

    db.collection('score').find( { name:name } ).toArray(function(err, result){
        if (result.length > 0) // user exists
        {
          if (result[0].score < score) 
          {
            db.collection('score').update({name:name },{$set:{score:score}},function(){
              db.close();
            });
          }
        }
        else // playing for the first time
        {
          db.collection('score').insert(data, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);

            db.close();
          });
        }
              
        });
    

    // Insert a single document
    
  });
}


function getScore(func) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    db.collection('score').find({}).sort({ score: -1 }).limit(5).toArray(function (err, score) {
      assert.equal(err, null);
      func(score);
      db.close();
    });
  });
}

function getBest(username,func) {
  // console.log("func: "+func);
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('score').find({name:username}).toArray(function (err, score) {
      assert.equal(err, null);
      if (score.length > 0) 
      {
        func(score);
      }
      db.close();
    });
  });
}


module.exports.insertScore = insertScore;
module.exports.getScore = getScore;
module.exports.getBest = getBest;