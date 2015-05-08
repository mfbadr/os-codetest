'use strict';

var items;

$.getJSON('/getitems', function(data){
  console.log(data);
  items = data.items;
  addItems(items);
});

function addItems(items){
  for(var i = 0; i < items.length; i++){
    var $item  = $('<div/>', {'class': 'item'}),
         text  = items[i].OSS.Name + '<br />' +
          ' from ' + items[i].OSS.Company,
         $text = $('<div/>', {'class': 'itemText'}),
         $img  = $('<img>', {'class': 'itemImage'});

    $img.attr('src', items[i].OSS.Image);

    $item.append($img);

    $text.html(text);
    $item.append($text);

    $item.prependTo('#item-wrapper');
  }
}



