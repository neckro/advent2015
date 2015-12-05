var md5 = require('md5');

var prefix = 'bgvyzdsv';

var i = 0;
do {
  var test = md5(prefix + i);
  if (test.slice(0, 6) === '000000') {
    console.log('4-2', i, test);  // 1038736
    break;
  }
  if (test.slice(0, 5) === '00000') {
    console.log('4-1', i, test);  // 254575
  }
} while (++i);
