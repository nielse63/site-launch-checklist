
import http from 'http'
import https from 'https'
import url from 'url'
import UrlCache from 'urlcache'
require('dotenv').config({silent: true})

export default function (ping, callback) {

  // get cached version
  const cacheLength = process.env.CACHE_LENGTH || 10000
  var urlcache = new UrlCache({
    expiryTime : cacheLength
  });
  const cache = urlcache.get(ping)
  if( cache ) {
    return callback(null, cache)
  }

  // ping given url
  const parsedUrl = url.parse(ping)
  const cls = parsedUrl.protocol.indexOf('s:') > -1 ? https : http
  const req = cls.request(parsedUrl);

  // get data
  cls.get(ping, (res) => {

    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      const output = {
        url : ping,
        status : res.statusCode,
        headers : res.headers,
        body : body
      }
      urlcache.set(ping, output, cacheLength)
      callback(null, output)
    });
  }).on('error', (e) => {
    throw new Error(`Got error: ${e.message}`);
  })
}
