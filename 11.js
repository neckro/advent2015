var _ = require('lodash');

var input = 'hepxcrrq';

function increment(str) {
  str = 'a' + str;
  for (var i = str.length - 1; i >= 0; i--) {
    var code = str.charCodeAt(i) + 1;
    if (code > 122) {
      code = 97;
    }
    if (_.contains(['i', 'o', 'l'], str[i])) code++;
    str = str.slice(0, i) + String.fromCharCode(code) + str.slice(i + 1);
    if (code !== 97) break;
  }
  return str.slice(1);
}

function threes(str) {
  for (var i = 0; i < str.length - 2; i++) {
    var a = str.charCodeAt(i);
    var b = str.charCodeAt(i+1);
    var c = str.charCodeAt(i+2);
    if (c - b === 1 && b - a === 1) {
      return true;
    }
  }
  return false;
}

function pairs(str) {
  var matches = str.match(/(\w)\1/g);
  if (matches === null) return false;
  return (_.uniq(matches).length > 1);
}

function validate(str) {
  return threes(str) && pairs(str);
}

function nextpass(str) {
  while (1) {
    str = increment(str);
    if (validate(str)) return str;
  }
}

var pass;
pass = nextpass(input);
console.log('11-1', pass);  // hepxxyzz
pass = nextpass(pass);
console.log('11-2', pass);  // heqaabcc
