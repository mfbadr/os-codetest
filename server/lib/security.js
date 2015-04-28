'use strict';

var User = require('../models/user');

exports.bounce = function(req, res, next){
  User.findById(req.session.userId, function(err, user){
    if(user){
      req.user = user;
      next();
    }else{
      //var target = encodeURIComponent(req.path);
      req.session.redirectTo = req.path;
      req.session.save(function(err){
        if(err){console.log(err);}
        res.redirect(302, '/login');
      });
      //res.redirect(302, 'login?redirect=' + target);
    }
  });
};

exports.userStatus = function(req, res, next){
  User.findById(req.session.userId, function(err, user){
    if(user){
      req.user = user;
      next();
    }else{
      req.user = null;
      next();
    }
  });
};
