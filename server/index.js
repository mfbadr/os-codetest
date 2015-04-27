'use strict';

var port    = process.env.PORT,
    db      = process.env.DB,
    express = require('express'),
    app     = express();

app.set('views', './views');
app.set('view engine', 'jade');
//
//seperate this into middleware and routes
require('./middleware/middleware')(app, express);
require('./routes/routes')(app, express);

require('./lib/mongodb')(db, function(){
  console.log('Express is lsitening on port:', port);
  app.listen(port);
});

module.exports = app;

