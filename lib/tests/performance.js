
import https from 'https'
import { hasKey, getInsightsURL } from '../utils'
import { PAGE_SPEED_MIN } from '../constants'

export default function(url) {
  return new Promise((resolve, reject) => {

    const get = getInsightsURL(url)

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

          const score = json.ruleGroups.SPEED.score
          const results = json.formattedResults.ruleResults
          const resultKeys = Object.keys(results)
          const info = resultKeys.reduce((acc, key) => {
            const rule = results[key]
            if( ! rule.ruleImpact ) {
              return acc
            }

            acc.push(rule.localizedRuleName)
            return acc
          }, [])

          resolve({
            passed : score >= PAGE_SPEED_MIN,
            reason : `Google PageSpeed Insights score of ${score} is lower than the required minimum ${PAGE_SPEED_MIN}`,
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
