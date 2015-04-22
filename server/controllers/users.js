'use strict';

var User = require('../models/user');

exports.register = function(req, res){
  console.log('USER.REGISTER REQ.BODY>>>>>>>', req.body);
  User.register(req.body, function(err, user){
    if(user){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};

exports.login = function(req, res){
  console.log('REQ.SESSION>>>>>>>', req.session);
  console.log('REQ.cookies>>>>>>>', req.cookies);
  User.login(req.body, function(err, user){
    if(user){
      //user found,
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          if(req.query.redirect){
            var target = req.query.redirect;
            //var target = 'https://www.google.com';
            console.log('REDIRECTO DETECTED: ', target);
            //res.clearCookie('redirectTo');
            //res.send('I tried to redirect you!');
            res.set('location', target);

            res.send({email:user.email});
          }else{
            console.log(req.path);
            console.log(req.query);
            console.log(req.params);
            console.log('something happened');
            res.send({email:user.email});
          }
          //res.send({email:user.email});
        });
      });
    }else{
      //couldn't log user in
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    if(err){console.log(err);}
    //res.clearCookie('connect.sid');
    res.status(200).end();
  });
};

