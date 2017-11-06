var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');


// simple API call, no authentication or user info
router.get('/public', function(req, res, next) {
console.log('auth0....... user id:', req.user);
  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

});

// checkJwt middleware will enforce valid authorization token
router.get('/private', checkJwt, function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

  // the auth0 user identifier for connecting users with data
  console.log('auth0....... user id:', req.user.sub);

  // fetch info about the user (this isn't useful here, just for demo)
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

});

/*Creating a new user*/
router.get('/createuserIfAbsent',function(req,res,next){
  req.db.collection('TaskCollection').find({"name": req.headers['username']}).toArray(function(err, results){
      console.log("User in db earlier" + results);
      if(results.length == 0){ //If no user
          results =  {
          "name": String(req.headers['username']),
          "cards":[]
        }

        console.log("User not in db ... creating user" + results);
        req.db.collection('TaskCollection').insert(results);
        console.log('User ' + req.headers['username'] + 'created successfuly');
      }
    });
});


/*GET all cards as JSON */
router.get('/cards', function(req, res, next) {
  //console.log(req.headers['username']);
  //console.log('auth0 user id:', req.user.sub);

  req.db.collection('TaskCollection').find({"name": req.headers['username']}).toArray(function(err,results){
    if(err){
      next(err);
    }
    res.send(results[0].cards);
    //console.log("These are cards for user  " + JSON.stringify(results[0].cards));
  });
});

<<<<<<< HEAD
=======
/*Create a Task for a cardId*/
router.post('/cards/:cardId/tasks',function(req,res,next){
  req.db.collection('TaskCollection').updateOne({"name":req.headers['username'], "cards.id":parseInt(req.params.cardId)},
        {"$push":
              {"cards.$.tasks":req.body}

        },function(err,documents){
          res.send({ error: err, affected: documents });
        });

  });
/*Add a card */
router.post('/cards', function(req, res, next){
  req.db.collection('TaskCollection').updateOne({"name": req.headers['username']}, {$push:{ "cards": req.body }}, function (err, documents) {
        res.send({ error: err, affected: documents });
    });
});

>>>>>>> db91e36fd43805f6ff20e7a7f8d4c8808a7dd908
router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  console.log();
  res.send(foo);
});


// function createNewTaskSequence(req,cardId){
//   var ret = req.db.collection('counters').insert(
//      {
//         id: cardId,
//         seq: 0,
//      }
//   );
// }

// function getNextSequence(req,cardId) {
//
//    var ret = req.db.collection('counters').findAndModify(
//           {
//             query: { id: 3 },
//             update: { $inc: { seq: 1 } },
//             new: true
//           }
//    );
//    console.log(ret,ret.seq);
//    return ret.seq;
// }

module.exports = router;
