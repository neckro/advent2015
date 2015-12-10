var fs = require('fs');

var input = fs.readFileSync('./08.input', { encoding: 'utf8' });

var precount = 0, postcount = 0;
input.split('\n').forEach(function(line) {
  precount += line.length;
  for (var i = 1; i < line.length - 1; i++) {
    postcount += 1;
    if (line[i] !== '\\') continue;
    i += 1;
    if (line[i] !== 'x') continue;
    i += 2;
  }
});
console.log('8-1', precount - postcount);  // 1342

postcount = 0;
input.split('\n').forEach(function(line) {
  var out = '"' + line
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    + '"';
  // console.log(line, out);
  postcount += out.length;
});
console.log('8-2', postcount - precount);  // 2074
