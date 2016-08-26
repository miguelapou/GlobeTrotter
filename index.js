// requires the express module
var express = require('express');
// creates an instance of a server object
var app = express();
var bodyParser = require('body-parser');
var db = require("./models")
var session = require("express-session")

app.set('view engine', 'ejs');

// app.use is setting up middleware
app.use(express.static(__dirname + '/public/'));

// body-parser JSON.parse()s the form or request
// body before passing it on to the correct route
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.get('/myjournal', function(req, res) {
  res.render('myJournal');
});

app.get('/post', function(req, res) {
  res.render('post');
});

app.get('/profile', function(req, res) {
  res.render('myProfile');
});

app.post('/userInfo', function(req, res) {
  db.user.create({
    name: req.body.nameInput,
    title: req.body.titleInput,
    quote: req.body.quoteInput,
    img: req.body.imgInput,
    email: req.body.emailInput,
    password: req.body.passwordInput
  }).then(function(user, created) {
    res.redirect('/login.html');
  }).catch(function(error) {
    res.redirect("/")
  });
});

app.post('/login', function(req, res) {
  db.user.find({
    where: {
      email: req.body.emailInput,
      password: req.body.passwordInput
    }
  }).then(function(user) {
    console.log(user)
    if (user !== null) {
      console.log('success')
      req.session.user = user;
      res.redirect('/myjournal')
    } else {
      console.log('fail')
      res.redirect('login.html')
    }
  });
});

app.listen(3000);