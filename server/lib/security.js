'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res, next){
  User.findById(req.session.userId, function(err, user){
    if(user){
      console.log('LOGGED IN USER ACCESSING SITE');
      req.user = user;
      next();
    }else{

      var target = encodeURIComponent(req.path);

      res.redirect(302, '/#/login?redirect=' + target);
    }
  });
};

