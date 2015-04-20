'use strict';

var users = require('../controllers/users'),
    security = require('../lib/security');

module.exports = function(app, express){
  app.route('/register')
    .post(users.register);
  app.route('/login')
    .post(users.login);

  app.use(security.authenticate);
  app.delete('/logout', users.logout);
  app.route('/restricted')
    .get(function(req, res){
      res.send('This page is for logged in users only!').status(200);
    });

  console.log('Express: Routes Loaded');
};
