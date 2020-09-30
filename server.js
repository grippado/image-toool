'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _etag = require('etag');

var _etag2 = _interopRequireDefault(_etag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.static('files'));
var download = function download(url) {
  return (0, _axios2.default)({
    url: url,
    method: 'get',
    responseType: 'stream'
  }).then(function (r) {
    return r.data;
  });
};
var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var transform = function transform(_ref) {
  var blur = _ref.blur,
      height = _ref.height,
      width = _ref.width,
      quality = _ref.quality,
      toFormat = _ref.toFormat;

  var sharpObj = (0, _sharp2.default)();
  if (Number.isInteger(height) && Number.isInteger(width)) {
    sharpObj.resize(width, height);
  } else if (isNumeric(width)) {
    sharpObj.resize(width);
  } else if (isNumeric(height)) {
    sharpObj.resize(null, height);
  }
  if (isNumeric(blur)) {
    sharpObj.blur(Math.min(1000, Math.max(blur, 0.3)));
  }
  sharpObj.jpeg({
    quality: isNumeric(quality) ? Math.max(1, Math.min(100, quality)) : 65
  });
  if (_sharp2.default.toFormat) {
    sharpObj.toFormat(toFormat);
  }
  return sharpObj;
};
app.get('/example.png');
app.get('/*', function (req, res) {
  var _req$query = req.query,
      blur = _req$query.blur,
      h = _req$query.h,
      w = _req$query.w,
      q = _req$query.q,
      e = _req$query.e;

  var url = 'http://localhost:8808/example.png';
  if (req.query.f != undefined) {
    url = req.query.f;
  }
  res.setHeader('ETag', (0, _etag2.default)(req.url));
  res.type(e || 'webp');
  res.set('Cache-Control', 'public, max-age=691200');
  download(url).then(function (r) {
    return r.pipe(transform({
      blur: parseInt(blur, 10),
      height: parseInt(h, 10),
      width: parseInt(w, 10),
      quality: q && parseInt(q, 10),
      toFormat: e
    })).pipe(res);
  }).catch(function () {
    res.status(404).send();
  });
});
app.server.listen(process.env.PORT || 8808, '0.0.0.0', function () {
  console.log('Started on port ' + app.server.address().port);
});
exports.default = app;
//# sourceMappingURL=server.js.map