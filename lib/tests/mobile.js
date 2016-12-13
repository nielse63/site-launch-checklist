
import https from 'https'
import { hasKey, getInsightsURL } from '../utils'
import { MOBILE_SPEED_MIN } from '../constants'

function getResults(json) {
  const score = json.ruleGroups.SPEED.score
  const results = json.formattedResults.ruleResults
  const resultKeys = Object.keys(results)

  return {
    score,
    results,
    resultKeys,
  }
}

function getInfo(json) {
  const { score, results, resultKeys } = getResults(json)

  let usabilityCount = 0
  const info = resultKeys.reduce((acc, key) => {
    const rule = results[key]
    if (!rule.ruleImpact) {
      return acc
    }

    if (rule.groups[0] === 'USABILITY') {
      usabilityCount += 1
    }

    acc.push(rule.localizedRuleName)
    return acc
  }, [])

  return {
    score,
    usabilityCount,
    info,
  }
}

export default function (url) {
  return new Promise((resolve, reject) => {
    const get = getInsightsURL(url, 'mobile')

    https.get(get, res => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', chunk => {
        body += chunk
      })

      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          if (!hasKey(json, 'ruleGroups')) {
            return reject('`ruleGroups` not in returned JSON')
          }

          const { score, usabilityCount, info } = getInfo(json)

          const reason = usabilityCount
            ? `${usabilityCount} mobile usability errors encountered`
            : `Google PageSpeed Insights score of ${score} is lower than the required minimum ${MOBILE_SPEED_MIN}`
          const passed = score >= MOBILE_SPEED_MIN && !usabilityCount

          resolve({
            passed,
            reason,
            info,
          })
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', e => {
      reject(e.message)
    })
  })
}
