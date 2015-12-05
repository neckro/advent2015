var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./03.input', { encoding: 'utf8' });

function santa(part) {
  var counts = {};
  var xa = 0, ya = 0;
  var xb = 0, yb = 0;
  for (var i = 0; i < input.length; i++) {
    var robo = !(part === 1 || i % 2 === 0);
    var x = robo ? xb : xa;
    var y = robo ? yb : ya;

    switch(input[i]) {
      case '>':
        x++; break;
      case '<':
        x--; break;
      case '^':
        y++; break;
      case 'v':
        y--; break;
      default:
        continue;
    }
    var hash = x + ',' + y;
    counts[hash] = (counts[hash] || 0) + 1;
    if (robo) {
      xb = x; yb = y;
    } else {
      xa = x; ya = y;
    }
  }
  return _.keys(counts).length;
}

console.log('3-1', santa(1));  // 2572
console.log('3-2', santa(2));  // 2631
