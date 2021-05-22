var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'learning_support',
    password: 'b2DRas!ewaqu',
    port: 5432,
  });

/* POST. */
router.get('/current_time', function(req, res, next) {
    pool.query('SELECT NOW()', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});

router.get('/users', function(req, res, next) {
    pool.query('SELECT first_name from users', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});

router.get('/tags', function(req, res, next) {
    pool.query('select * from tags order by tag_id asc;', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});
router.get('/documents', function(req, res, next) {
    pool.query('select * from documents', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});
module.exports = router;