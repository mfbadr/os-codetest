'use strict';

var users = require('../controllers/users'),
    items    = require('../lib/items.json'),
    security = require('../lib/security');

module.exports = function(app, express){
  app.use(security.userStatus);

  app.route('/register')
    .get(function(req, res){
      res.render('register', {user:req.user});
    })
    .post(users.register);

  app.route('/login')
    .get(function(req, res){
      res.render('login', {user:req.user});
    })
    .post(users.login);

  app.route('/stringparser')
    .get(function(req, res){
      res.render('stringParser', {user:req.user});
    });
  app.route('/frontend')
    .get(function(req, res){
      res.render('frontend');
    });

  app.route('/')
    .get(function(req, res){
      console.log('session:', req.session);
      res.render('index', {user:req.user});
    });

  app.route('/getitems')
    .get(function(req, res){
      res.send(items);
    });
  //must be logged in
  app.use(security.bounce);
  app.route('/logout')
    .post(users.logout);
  //app.delete('/logout', users.logout);
  app.route('/restricted')
    .get(function(req, res){
      res.render('restricted', {user:req.user});
    });

  console.log('Express: Routes Loaded');
};
