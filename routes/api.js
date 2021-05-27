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
router.get('/current_time', function (req, res, next) {
    pool.query('SELECT NOW()', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});

router.post('/userCheck', function (req, res, next) {
    let text = 'select username,password_hash from users where username = $1 and password_hash=$2 ';
    let values = [req.body.username, req.body.password];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        if (dbRes.rows.length > 0) {
            req.session.loggedIn = true;
            res.send({ ok: true });
        } else {
            res.send({ ok: false });
            req.session.loggedIn = false;
        }
    });
    console.log(req);
});
router.post('/logOut', function (req, res, next) {
    req.session.loggedIn = false;
    res.send(true);
    console.log(req);
});
router.get('/tags', function (req, res, next) {
    pool.query('select * from tags order by tag_id asc;', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});
router.get('/documents', function (req, res, next) {
    pool.query('select * from documents', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});

router.post('/saveDoc', function (req, res, next) {
    let text = 'insert into documents (document_link,document_tags,document_name,document_description) VALUES ($1, $2, $3 ,$4) returning document_id';
    let values = [req.body.document_link, req.body.document_tags, req.body.document_name, req.body.document_description];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});

router.post('/updateDoc', function (req, res, next) {
    let text = 'update documents set document_link = $1,document_tags = $2,document_name = $3,document_description = $4 where document_id=$5';
    let values = [req.body.document_link, req.body.document_tags, req.body.document_name, req.body.document_description, req.body.document_id];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});
router.delete('/deleteDoc', function (req, res, next) {
    let text = 'delete from documents where document_id = $1';
    let values = [req.body.document_id];
    console.log(values);
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});
module.exports = router;