
import https from 'https'
import { hasKey } from '../utils'

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
          if( ! hasKey(json, 'ruleGroups') ) {
            console.log(json)
            return reject('`ruleGroups` not in returned JSON')
          }

          const score = json.ruleGroups.SPEED.score
          const results = json.formattedResults.ruleResults
          const resultKeys = Object.keys(results)
          let info = []
          resultKeys.forEach((key) => {
            const rule = results[key]
            if( ! rule.ruleImpact ) {
              return
            }

            info.push({
              title : rule.localizedRuleName
            })
          })

          resolve({
            name : 'performance',
            passed : score >= threshold,
            reason : `Google PageSpeed score of ${score} is lower than the threshold of ${threshold}`,
            info : info
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
