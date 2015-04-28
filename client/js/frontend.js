'use strict';

var items;

$.getJSON('/getitems', function(data){
  console.log(data);
  items = data;
});

//TODO: put items in flexbox containers
//use front-end.less to style


