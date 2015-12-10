var _ = require('lodash');
var fs = require('fs');

var input = '1113222113';

function say(input) {
  var out = '';
  for (var i = 0; i < input.length; i++) {
    var count = 1;
    var num = input[i];
    while (input[i+1] === num) {
      count++; i++;
    }
    out += count + num;
  }
  return out;
}
function elf(seq, times) {
  var last = seq;
  while (times--) {
    last = say(last);
  }
  return last;
}
console.log('10-1', elf(input, 40).length);  // 252954
console.log('10-2', elf(input, 50).length);  // 3579328
