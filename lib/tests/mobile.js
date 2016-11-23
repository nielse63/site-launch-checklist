
import https from 'https'
import { hasKey, getInsightsURL } from '../utils'

export default function(url) {
  return new Promise((resolve, reject) => {

    const threshold = 85
    const get = getInsightsURL(url, 'mobile')

    https.get(get, (res) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => {
        body += chunk
      })

      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          if( ! hasKey(json, 'ruleGroups') ) {
            return reject('`ruleGroups` not in returned JSON')
          }

          const score = json.ruleGroups.SPEED.score
          const results = json.formattedResults.ruleResults
          const resultKeys = Object.keys(results)
          let usabilityCount = 0
          const info = resultKeys.reduce((acc, key) => {
            const rule = results[key]
            if( ! rule.ruleImpact ) {
              return acc
            }

            if( rule.groups[0] === 'USABILITY' ) {
              usabilityCount++
            }

            acc.push(rule.localizedRuleName)
            return acc
          }, [])

          const reason = usabilityCount ?
            `${usabilityCount} mobile usability errors encountered` :
            `Google PageSpeed Insights score of ${score} is lower than the required minimum ${threshold}`
          const passed = score >= threshold && ! usabilityCount
          resolve({
            passed : passed,
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
