var through = require('through');

function prop(propName) {
  return function (data) {
    return data[propName];
  };
}

module.exports = unique;
function unique(propName) {
  var keyfn = JSON.stringify;
  if (typeof propName === 'string') {
    keyfn = prop(propName);
  } else if (typeof propName === 'function') {
    keyfn = propName;
  }
  var seen = {};
  return through(function (data) {
    var key = keyfn(data);
    if (seen[key] === undefined) {
      seen[key] = true;
      this.queue(data);
    }
  });
}
