
import https from 'https'

export default function(url) {
  return new Promise((resolve, reject) => {

    const threshold = 85
    const ping = encodeURIComponent( url )
    const strategy = 'desktop'
    const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ ping }&screenshot=false&strategy=${ strategy }&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg`

    https.get(get, (res) => {

      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          const score = json.ruleGroups.SPEED.score
          resolve({
            name : 'performance',
            passed : score >= 85,
            reason : `Google PageSpeed score of ${score} is lower than the threshold of 85`
          })
        } catch(e) {
          throw new Error(e)
        }
      });
    }).on('error', (e) => {
      throw new Error(`Got error: ${e.message}`);
    })
  })
}
