var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection.js');

router.get('/', function(req, res) {
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM tasks ORDER BY created_date DESC", function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newTask = req.body;

  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("INSERT INTO tasks (task_content) VALUES ($1)",
        [newTask.content],
        function (err, result) {
          done();
          if(err) {
            console.log(err);
            res.sendStatus(500);
          }

          res.sendStatus(201);
        }
      )}
    );
});

router.put('/:id', function(req, res) {
  var taskID = req.params.id;
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("UPDATE tasks SET completed_date = 'NOW()' WHERE id = $1", [taskID], function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.sendStatus(204);
    });
  });
});

router.delete('/:id', function(req, res) {
  var taskID = req.params.id;
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("DELETE FROM tasks WHERE id = $1", [taskID], function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.sendStatus(204);
    });
  });
});


module.exports = router;
