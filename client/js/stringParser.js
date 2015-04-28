'use strict';

console.log('stringParser loaded');

function StringParser(s){
  this.string = s;
}

StringParser.prototype.count = function(){
  var charArray = this.string.toLowerCase().split(''),
      countObj  = {};

  for(var i = 0; i < charArray.length; i++){
    if(!countObj[charArray[i]]){
      countObj[charArray[i]] = 1;
    }else{
      countObj[charArray[i]]++;
    }
  }
  return countObj;
};

StringParser.prototype.minAndMax = function(){
  var countObj  = this.count(),
      keysArray = Object.keys(countObj),
      minArray  = [],
      maxArray  = [],
      min       = Infinity,
      max       = 0;

  //loop to create minArray and min
  for(var i = 0; i < keysArray.length; i++){
    var currentMinChar = keysArray[i];
    if(countObj[currentMinChar] < min){
      //less than min, clear array, set new min
      min = countObj[currentMinChar];
      minArray = [currentMinChar];
    }else if(countObj[currentMinChar] === min){
      minArray.push(currentMinChar);
    }
  }

  //loop to create maxArray and max
  for(i = 0; i < keysArray.length; i++){
    var currentMaxChar = keysArray[i];
    if(countObj[currentMaxChar] > max){
      //less than min, clear array
      max = countObj[currentMaxChar];
      maxArray = [currentMaxChar];
    }else if(countObj[currentMaxChar] === max){
      maxArray.push(currentMaxChar);
    }
  }

  return {
    'minArray':minArray,
    'minCount': min,
    'maxArray': maxArray,
    'maxCount': max
  };
};

$('#button').click(function(){
  console.log('foo');
  var inputString = $('#string').val(),
      inputParser = new StringParser(inputString);
  $('#count').text(JSON.stringify(inputParser.count(), null, '\t'));
  $('#minAndMax').text(JSON.stringify(inputParser.minAndMax(), null, '\t'));
  return;
});



