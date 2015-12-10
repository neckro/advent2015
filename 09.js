var _ = require('lodash');
var fs = require('fs');
var permute = require('permute');

var input = fs.readFileSync('./09.input', { encoding: 'utf8' });

function getRoutes() {
  var routes = {};
  input.split('\n').forEach(function(line) {
    var matches = line.match(/^(\w+) to (\w+) = (\d+)$/);
    if (!matches) return;
    var loca = matches[1];
    var locb = matches[2];
    var distance = matches[3];
    if (!_.isObject(routes[loca])) routes[loca] = {};
    if (!_.isObject(routes[locb])) routes[locb] = {};
    var distance = parseInt(distance, 10);
    if (_.isNaN(distance)) {
      console.error(loca, locb, distance);
      return;
    }
    routes[loca][locb] = distance;
    routes[locb][loca] = distance;
  });
  return routes;
}

var routes = getRoutes();
var locs = _.keys(routes);
var best = Infinity;
var worst = 0;
while (permute(locs)) {
  var lastloc = '';
  var distance = _.sum(_.map(locs, function(loc) {
    if (lastloc) {
      var dist = routes[lastloc][loc];
      if (!_.isFinite(dist)) {
        console.error(lastloc, loc, dist);
        dist = 0;
      }
    }
    lastloc = loc;
    return dist;
  }));
  if (distance < best) {
    best = distance;
    console.log("New  best:", locs.join(' -> '), '=', best);
  }
  if (distance > worst) {
    worst = distance;
    console.log("New worst:", locs.join(' -> '), '=', worst);
  }
}
console.log('9-1', best);   // 207
console.log('9-2', worst);  // 804
