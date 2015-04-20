'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res, next){
  User.findById(req.session.userId, function(err, user){
    if(user){
      req.user = user;
      next();
    }else{
      //set redirect_to cookie, send to log in page
      console.log('REDIRECTED>>>>>>>>')
      req.session.redirect_to = 'redirect to';
      req.session.save(function(){
        res.redirect(401, '/#/login');
      });
    }
  });
};

