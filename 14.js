var _ = require('lodash');
var fs = require('fs');

var input = fs.readFileSync('./14.input', { encoding: 'utf8' });

// input = 'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.';

var reindeer = {};
_.forEach(input.split('\n'), function(line) {
  var matches = line.match(/^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds.$/);
  if (!_.isArray(matches)) return;
  var name = matches[1];
  var speed = parseInt(matches[2], 10);
  var burst = parseInt(matches[3], 10);
  var recovery = parseInt(matches[4]);
  reindeer[name] = {
    speed: speed,
    burst: burst,
    recovery: recovery,
    ttl: 0,
    distance: 0,
    score: 0
  };
});
for (var i = 0; i < 2503; i++) {
  _.forEach(reindeer, function(deer) {
    deer.ttl--;
    if (deer.ttl < 1) {
      deer.ttl = deer.burst + deer.recovery;
    }
    if (deer.ttl > deer.recovery) {
      deer.distance += deer.speed;
    }
  });
  var best = _.max(_.pluck(reindeer, 'distance'));
  var winners = _.where(reindeer, { distance: best });
  _.each(winners, function(deer) {
    deer.score += 1;
  });
}

console.log('14-1', _.max(_.pluck(reindeer, 'distance')));
console.log('14-2', _.max(_.pluck(reindeer, 'score')));
