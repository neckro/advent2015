var _ = require('lodash');
var fs = require('fs');

var json = fs.readFileSync('./12.input', { encoding: 'utf8' });
var input = JSON.parse(json);

function scan(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    var start = i;
    while (input[i].match(/[-0-9]/)) i++;
    if (start === i) continue;
    var num = input.slice(start, i);
    sum += parseInt(num, 10);
  }
  return sum;
}

function recurse(obj) {
  if (!_.isArray(obj) && _.contains(_.values(obj), 'red')) return 0;
  var subtotal = 0;
  _.each(obj, function(val, key) {
    if (_.isObject(val)) {
      subtotal += recurse(val);
      return;
    }
    var num = parseInt(val, 10);
    if (_.isFinite(num)) subtotal += num;
  })
  return subtotal;
}

console.log('12-1', scan(json));  // 111754
console.log('12-2', recurse(input));  // 65402
