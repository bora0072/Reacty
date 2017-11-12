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
        req.db.collection('TaskCollection').insert(results,function(err,documents){
          console.log('User ' + req.headers['username'] + 'created successfuly');
          res.send("User Created");
        });
      }else{
          res.send("User Already Present");
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
    if(results.length==0){
      res.send([]);
    }else{
      res.send(results[0].cards);
    }
    //console.log("These are cards for user  " + JSON.stringify(results[0].cards));
  });
});

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

//Deleting a task
router.delete('/cards/:cardId/tasks/:taskId', function(req, res, next){
  req.db.collection('TaskCollection').find({
      "name": req.headers['username'],
    }, { "cards.id": parseInt(req.params.cardId),'cards.tasks':1, '_id': 0}).toArray(function (err, results) {
        var allTasks = getObjects(results, 'id', parseInt(req.params.cardId))[0].tasks;
        findAndRemove(allTasks, 'id', parseInt(req.params.taskId));
        req.db.collection('TaskCollection').updateOne({ "name": req.headers['username'], "cards.id": parseInt(req.params.cardId)},
            {
              "$set":
                {"cards.$.tasks": allTasks}
            }, function (err, documents) {
              res.send({ error: err, affected: documents });
          });
      });
});

//Editing a task
router.put('/cards/:cardId/tasks/:taskId', function(req, res, next){
  //extract all notes for give particular notebook
  //Query to get all notes for a particular user
  req.db.collection('TaskCollection').find({
      "name": req.headers['username'],
    }, { "cards.id": parseInt(req.params.cardId),'cards.tasks':1, '_id': 0}).toArray(function (err, results) {
        //res.send(getObjects(results, 'notebookname', 'notebook1')[0].notes);
        var allTasks = getObjects(results, 'id', parseInt(req.params.cardId))[0].tasks;
        for(var i=0; i<allTasks.length; i++){
            if(allTasks[i].id == parseInt(req.params.taskId)){
              allTasks[i].done = req.body.done;
            }
        }
        //Now again make a call to the db and push back all the notes to the particular notebook
        req.db.collection('TaskCollection').updateOne({ "name": req.headers['username'], "cards.id": parseInt(req.params.cardId)},
            {
              "$set":
                {"cards.$.tasks": allTasks}
            }, function (err, documents) {
              res.send({ error: err, affected: documents });
          });
  });
});

//changing the status of cards
router.put('/cards/:cardId', function(req, res, next){
  req.db.collection('TaskCollection').updateOne({ "name": req.headers['username'], "cards.id": parseInt(req.params.cardId)},
      {
        "$set":
          {"cards.$.status": req.body.status}
      }, function (err, documents) {
        res.send({ error: err, affected: documents });
    });
});

router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  console.log();
  res.send(foo);
});

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function findAndRemove(array, property, value) {
  array.forEach(function(result, index) {
    if(result[property] === value) {
      array.splice(index, 1);
    }
  });
}

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
