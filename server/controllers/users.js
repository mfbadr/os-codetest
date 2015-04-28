'use strict';

var User = require('../models/user');

exports.register = function(req, res){
  User.register(req.body, function(err, results){
    if(results.ops[0]){
      var user = results.ops[0];
      success(req, res, user);
    }else{
      res.status(500).end();
    }
  });
};

exports.login = function login(req, res){
  User.login(req.body, function(err, user){
    if(user){
      success(req, res, user);
    }else{
      res.render('Incorrect log in information');
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.redirect(302, '/');
  });
};

function success(req, res, user){
  if(req.session.redirectTo){
    var target = req.session.redirectTo;
    req.session.regenerate(function(){
      req.session.userId = user._id;
      req.session.save(function(){
        res.redirect(302, target);
      });
    });
  }else{
    req.session.regenerate(function(){
      req.session.userId = user._id;
      req.session.save(function(){
        res.redirect(302, '/');
      });
    });
  }
}
