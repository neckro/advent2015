var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./06.input', { encoding: 'utf8' });

function santa(pass) {
  var grid = [];

  _.forEach(input.split('\n'), function(line) {
    var matches = line.match(/^([\w ]+) (\d+),(\d+) through (\d+),(\d+)$/);
    if (matches.length === 0) return;
    var command = matches[1];
    var xa = parseInt(matches[2], 10);
    var ya = parseInt(matches[3], 10);
    var xb = parseInt(matches[4], 10);
    var yb = parseInt(matches[5], 10);
    for (var x = xa; x <= xb; x++) {
      for (var y = ya; y <= yb; y++) {
        var index = x * 1e3 + y;
        var lit = grid[index] || 0;
        if (pass === 1) {
          switch (command) {
            case 'turn on':
              lit = true;
              break;
            case 'turn off':
              lit = false;
              break;
            case 'toggle':
              lit = !lit;
          }
        }
        if (pass === 2) {
          switch(command) {
            case 'turn on':
              lit++;
              break;
            case 'turn off':
              lit--;
              if (lit < 0) lit = 0;
              break;
            case 'toggle':
              lit += 2;
          }
        }
        grid[index] = lit;
      }
    }
  });
  if (pass === 1) {
    return _.compact(grid).length;
  }
  if (pass === 2) {
    return _.sum(grid);
  }
}

console.log('6-1', santa(1));
console.log('6-2', santa(2));
