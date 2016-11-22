
import https from 'https'
import { hasKey } from '../utils'

export default function(url) {
  return new Promise((resolve, reject) => {

    const threshold = 85
    const usabilityThreshold = 95
    const ping = encodeURIComponent( url )
    const strategy = 'mobile'
    const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ ping }&screenshot=false&strategy=${ strategy }`

    https.get(get, (res) => {

      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          if( ! hasKey(json, 'ruleGroups') ) {
            console.log(json)
            return reject('`ruleGroups` not in returned JSON')
          }

          const score = json.ruleGroups.SPEED.score
          if( score < threshold ) {
            return resolve({
              name : 'mobile',
              passed : false,
              reason : `Google PageSpeed score of ${score} is lower than the threshold of ${threshold}`
            })
          }
          const usabilityScore = json.ruleGroups.USABILITY.score
          resolve({
            name : 'mobile',
            passed : usabilityScore >= usabilityThreshold,
            reason : `Google PageSpeed mobile usability score of ${usabilityScore} is lower than the threshold of ${usabilityThreshold}`
          })
        } catch(e) {
          console.trace(e)
          reject(e)
        }
      });
    }).on('error', (e) => {
      reject(e.message)
    })
  })
}
