var fs = require('fs');

var input = fs.readFileSync('./01.input', { encoding: 'utf8' });

function santa(part) {
  var floor = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      floor++;
    } else if (input[i] === ')') {
      floor--;
    }
    if (floor < 0 && part === 2) {
      return i + 1;
    }
  }
  return floor;
}

console.log('1-1', santa(1));  // 138
console.log('1-2', santa(2));  // 1771
