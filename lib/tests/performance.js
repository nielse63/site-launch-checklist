
import https from 'https'

export default function(url) {
  return new Promise((resolve, reject) => {

    const threshold = 85
    const ping = encodeURIComponent( url )
    const strategy = 'desktop'
    const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ ping }&screenshot=false&strategy=${ strategy }`

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
            passed : score >= threshold,
            reason : `Google PageSpeed score of ${score} is lower than the threshold of ${threshold}`
          })
        } catch(e) {
          reject(e)
        }
      });
    }).on('error', (e) => {
      reject(e.message)
    })
  })
}
