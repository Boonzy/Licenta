var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    res.render('index', { title: 'School Smart Solutions' });
  } else {
    res.render("login");
  }
});

module.exports = router;
