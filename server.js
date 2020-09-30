import http from 'http';
import express from 'express';
import morgan from 'morgan';
import axios from 'axios';
import sharp from 'sharp';
import etag from 'etag';

let app = express();
app.server = http.createServer(app);
app.use(morgan('dev'));
app.use(express.static('files'));
const download = url => axios({
  url,
  method: 'get',
  responseType: 'stream'
}).then(r => r.data);
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
const transform = ({
  blur,
  height,
  width,
  quality,
  toFormat
}) => {
  const sharpObj = sharp();
  if (Number.isInteger(height) && Number.isInteger(width)) {
    sharpObj.resize(width, height)
  } else
  if (isNumeric(width)) {
    sharpObj.resize(width);
  } else
  if (isNumeric(height)){
    sharpObj.resize(null, height)
  }
  if (isNumeric(blur)) {
    sharpObj.blur(Math.min(1000, Math.max(blur, 0.3)))
  }
  sharpObj.jpeg({
    quality: isNumeric(quality) ? Math.max(1, Math.min(100, quality)) : 65,
  })
  if (sharp.toFormat) {
    sharpObj.toFormat(toFormat)
  }
  return sharpObj
}
app.get('/example.png')
app.get('/*', (req, res) => {
	const { blur, h, w, q, e } = req.query;
  let url = 'http://localhost:8808/example.png';
  if(req.query.f != undefined) {
    url = req.query.f
  }
  res.setHeader('ETag', etag(req.url))
  res.type(e || 'webp');
  res.set('Cache-Control', 'public, max-age=691200')
  download(url)
    .then((r) => 
      r.pipe(transform({
        blur: parseInt(blur, 10),
        height: parseInt(h, 10),
        width: parseInt(w, 10),
        quality: q && parseInt(q, 10),
        toFormat: e
      }))
      .pipe(res)
    )
    .catch(() => {
      res.status(404).send();
    });
});
app.server.listen(process.env.PORT || 8808, '0.0.0.0', () => {
	console.log(`Started on port ${app.server.address().port}`);
});
export default app;
