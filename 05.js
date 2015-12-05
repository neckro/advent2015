var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./05.input', { encoding: 'utf8' });

var badStrings = ['ab', 'cd', 'pq', 'xy'];

function santa(part) {
  var nice = 0;
  var naughty = 0;
  var i;
  _.forEach(input.split('\n'), function(line) {
    if (!line) return;
    naughty++;  // guilty until proven innocent

    if (part === 1) {
      // Rule 5-1-3
      for (i = 0; i < badStrings.length; i++) {
        if (line.includes(badStrings[i])) return;
      }
      // census break
      var census = {};
      for (i = 0; i < line.length; i++) {
        var letter = line[i];
        if (!(/[a-z]/.test(letter))) continue;
        census[line[i]] = (census[line[i]] || 0) + 1;
      }
      // Rule 5-1-1
      var vowels = _.reduce('aeiou'.split(''), function (v, letter) {
        return v + (census[letter] || 0);
      }, 0);
      if (vowels < 3) return;
      // Rule 5-1-2
      var anyDoubles = _.any(_.keys(census), function(letter) {
        if (census[letter] < 2) return;
        return (line.search(letter + letter) !== -1);
      });
      if (!anyDoubles) return;
    }
    if (part === 2) {
      // Rule 5-2-1
      var doubles = [];
      for (i = 0; i < line.length - 1; i++) {
        doubles.push(line[i] + line[i+1]);
      }
      var twoPairs = _.some(doubles, function(d) {
        var matches = line.match(new RegExp(d, 'g'));
        return (matches.length > 1);
      });
      if (!twoPairs) return;
      // Rule 5-2-2
      var letters = line.split('');
      if (!_.any(letters, function(letter) {
        return (new RegExp(letter + '[a-z]' + letter).test(line));
      })) return;
    }

    naughty--;  // struck from the list
    nice++;
  });
  return nice;
}

console.log('5-1', santa(1));  // 238
console.log('5-2', santa(2));  // 69
