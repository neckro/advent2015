var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./07.input', { encoding: 'utf8' });

var lastlog;

function getValue(source) {
  if (!_.isString(source)) return;
  var v = parseInt(source, 10);
  if (_.isNaN(v)) v = vals[source];
  return v;
}
function getResult(source, operator, argument) {
  switch(operator) {
    case 'AND':
      if (_.isUndefined(source) || _.isUndefined(argument)) return;
      return source & argument;
    case 'OR':
      if (_.isUndefined(source) || _.isUndefined(argument)) return;
      return source | argument;
    case 'NOT':
      if (_.isUndefined(argument)) return;
      return 65535 - argument;
    case 'LSHIFT':
      if (_.isUndefined(source) || _.isUndefined(argument)) return;
      return source << argument;
    case 'RSHIFT':
      if (_.isUndefined(source) || _.isUndefined(argument)) return;
      return source >> argument;
    default:
      return argument;
  }
}
function santa(override) {
  _.forEach(input.split('\n'), function(line) {
    var halves = line.split(' -> ');
    if (halves.length < 2) return;
    var target = halves[1];
    var ops = halves[0].split(' ');
    var source, operator = 'IDENTITY', argument;
    switch (ops.length) {
      case 3:
        source = ops[0];
        operator = ops[1];
        argument = ops[2];
        break;
      case 2:
        operator = ops[0];
        argument = ops[1];
        break;
      case 1:
        argument = ops[0];
        break;
      default:
        return;
    }
    var sourceVal = getValue(source);
    var argumentVal = getValue(argument);
    var result = getResult(sourceVal, operator, argumentVal);
    if (_.isFinite(result)) vals[target] = result;

    if (override) vals.b = override;

    var log = JSON.stringify(vals);
    if (log !== lastlog) {
      // console.log([source, operator, argument, '->', target].join(' '));
      // console.log([sourceVal, operator, argumentVal, '=', vals[target], '->', target].join(' '));
      // console.log(log);
      lastlog = log;
    }
  });
}

var vals = {};
while (!vals.a) santa();
var aval = vals.a;
console.log('7-1', aval);  // 3176
vals = {};
while (!vals.a) santa(aval);
console.log('7-2', vals.a);  // 14710
