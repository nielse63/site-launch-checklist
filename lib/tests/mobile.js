
import https from 'https'
import { hasKey } from '../utils'

export default function(url) {
  return new Promise((resolve, reject) => {

    const threshold = 85
    const ping = encodeURIComponent( url )
    const strategy = 'mobile'
    const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ ping }&screenshot=false&strategy=${ strategy }`

    https.get(get, (res) => {

      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => {
        body += chunk
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          if( ! hasKey(json, 'ruleGroups') ) {
            return reject('`ruleGroups` not in returned JSON')
          }

          const results = json.formattedResults.ruleResults
          const resultKeys = Object.keys(results)
          let info = []
          let usabilityCount = 0
          resultKeys.forEach((key) => {
            const rule = results[key]
            if( ! rule.ruleImpact ) {
              return
            }

            const group = rule.groups[0]
            if( group === 'USABILITY' ) {
              usabilityCount++
            }
            info.push(rule.localizedRuleName)
          })

          const score = json.ruleGroups.SPEED.score
          const reason = usabilityCount ?
            `Google PageSpeed found ${usabilityCount} mobile usability errors` :
            `Google PageSpeed score of ${score} is lower than the threshold of ${threshold}`
          resolve({
            name : 'mobile',
            passed : score >= threshold && ! usabilityCount,
            reason : reason,
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
