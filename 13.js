var _ = require('lodash');
var fs = require('fs');
var permute = require('permute');

var input = fs.readFileSync('./13.input', { encoding: 'utf8' });

var mapping = {};
_.forEach(input.split('\n'), function(line) {
  var matches = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/);
  if (!_.isArray(matches)) return;
  var beholder = matches[1];
  var beheld = matches[4];
  var units = matches[3] * (matches[2] === 'lose' ? -1 : 1);
  var bmap = mapping[beholder];
  if (!_.isObject(bmap)) bmap = {};
  bmap[beheld] = units;
  mapping[beholder] = bmap;
});
function findbest() {
  var persons = _.keys(mapping);
  var best = -Infinity;
  while (permute(persons)) {
    var happiness = _.sum(_.map(persons, function(p, i) {
      var next = (i + persons.length + 1) % (persons.length);
      var prev = (i + persons.length - 1) % (persons.length);
      var map = mapping[p];
      var happy = (map[persons[next]] || 0) + (map[persons[prev]] || 0);
      return happy;
    }));
    if (happiness > best) best = happiness;
  }
  return best;
}

console.log('13-1', findbest());  // 618
mapping.self = {};
console.log('13-2', findbest());  // 601
