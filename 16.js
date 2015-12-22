var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./16.input', { encoding: 'utf8' });

var evidence = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

function encabulate(part, filter) {
  input.split('\n').forEach(function(line) {
    var matches = line.match(/^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/);
    var sue = {};
    var suenum = matches[1];
    sue[matches[2]] = +matches[3];
    sue[matches[4]] = +matches[5];
    sue[matches[6]] = +matches[7];
    if (filter(sue)) {
      console.log('16-' + part, suenum);  // 213
    }
  });
}

encabulate(1, function (sue) {
  return _.findWhere([evidence], sue);
});

var omissions = ['cats', 'trees', 'pomeranians', 'goldfish'];
var new_evidence = _.omit(evidence, omissions);
encabulate(2, function (sue) {
  if (sue.cats <= evidence.cats) return false;
  if (sue.trees <= evidence.trees) return false;
  if (sue.pomeranians >= evidence.pomeranians) return false;
  if (sue.goldfish >= evidence.goldfish) return false;
  return _.findWhere([new_evidence], _.omit(sue, omissions));
});
