var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./02.input', { encoding: 'utf8' });

var totala = 0, totalb = 0;
input.split('\n').forEach(function (line) {
  var dims = _.map(line.split('x'), _.parseInt);
  if (dims.length < 3) return;

  var areas = [
    dims[0] * dims[1],
    dims[1] * dims[2],
    dims[0] * dims[2]
  ];
  totala += (2 * _.sum(areas)) + _.min(areas);

  var perms = [
    dims[0] + dims[1],
    dims[1] + dims[2],
    dims[0] + dims[2]
  ];
  totalb += (2 * _.min(perms)) + (dims[0] * dims[1] * dims[2]);
});

console.log('2-1', totala);  // 1586300
console.log('2-2', totalb);  // 3737498
