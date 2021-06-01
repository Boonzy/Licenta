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
    let text = 'select user_id from users where username = $1 and password_hash=$2 ';
    let values = [req.body.username, req.body.password];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        if (dbRes.rows.length > 0) {
            req.session.loggedIn = true;
            req.session.user_id = dbRes.rows[0].user_id;
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
router.get('/roles', function (req, res, next) {
    pool.query('select * from roles', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes.rows);
    });
});
router.get('/userProfile', function (req, res, next) {
    pool.query(`
    select u.first_name,u.last_name,r.role_id,r.role_name 
    from users u 
        join user_roles ur ON u.user_id = ur.user_id 
        join roles r on r.role_id =ur.role_id 
    where u.user_id = $1;`, [req.session.user_id], (err, dbRes) => {
            console.log(err, dbRes)
            res.send(dbRes.rows[0]);
        });
});
router.get('/userList', function (req, res, next) {
    pool.query(`
    select u.user_id,u.first_name,u.last_name,r.role_id,r.role_name 
    from users u 
        join user_roles ur ON u.user_id = ur.user_id 
        join roles r on r.role_id =ur.role_id ;`, (err, dbRes) => {
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
router.delete('/deleteUser', function (req, res, next) {
    console.log("delete user");
    let text = 'delete from users where user_id = $1';
    let values = [req.body.user_id];
    console.log("Delete User", values);
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        if (err) {
            return next(err);
        }
        res.send(dbRes);
    });
    console.log(req);
});
router.delete('/deleteTag', function (req, res, next) {
    let text = 'delete from tags where tag_id = $1';
    let values = [req.body.tag_id];
    console.log(values);
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});

router.post('/addUser', function (req, res, next) {
    let text = `with u as (insert into users(first_name, last_name,password_hash) values($1,$2,'qwe123') returning user_id) insert into user_roles(user_id, role_id) select user_id, $3 from u;`;
    let values = [req.body.first_name, req.body.last_name, req.body.role_id];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});


router.post('/updateUser', function (req, res, next) {
    pool.query('UPDATE users SET first_name=$1, last_name=$2 where user_id=$3;', [req.body.first_name, req.body.last_name, req.body.user_id])
        .then(res1 => {
            return pool.query('update user_roles set role_id= $1 where user_id=$2;', [req.body.role_id, req.body.user_id]);
        })
        .then(res2 => {
            res.send(res2);
            return next(null, res2);
        })
        .catch(e => {
            return next(e);
        });
    console.log(req);
});

router.post('/addTag', function (req, res, next) {
    let text = `insert into tags (tag_name, tag_value) values ($1,$2)`;
    let values = [req.body.tag_name, req.body.tag_value];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});

router.post('/updateTag', function (req, res, next) {
    let text = `update tags set tag_name=$1, tag_values=$2 where tag_id = $3`;
    let values = [req.body.tag_name, req.body.tag_value, req.body.tag_id];
    pool.query(text, values, (err, dbRes) => {
        console.log(err, dbRes);
        res.send(dbRes);
    });
    console.log(req);
});

module.exports = router;