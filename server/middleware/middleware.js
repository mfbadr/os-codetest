'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    serveStatic    = require('serve-static'),
    redis          = require('redis'),
    redisClient    = redis.createClient(),
    RedisStore     = require('connect-redis')(session);
    //security       = require('../lib/security'),
    //users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(serveStatic(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  //console.log('REDISCLIENTS>>>>>>>', redisClient);
  //MAKE SURE THE REDIS DAEMON IS RUNNING!
  // $redis-server in the terminal
  redisClient.on('error', function(err){
    console.log('REDISCLIENT ERROR >>>>>>', err);
  });
  app.use(session(
    {
      store:new RedisStore({client:redisClient}),
      secret:'my super secret key',
      resave:true,
      saveUninitialized:false,
      cookie:{maxAge:null}
    }
  ));
  console.log('Express: Middleware Loaded');
};
