
import https from 'https'

export default function(url) {
  return new Promise((resolve) => {

    const threshold = 85
    const usabilityThreshold = 95
    const ping = encodeURIComponent( url )
    const strategy = 'mobile'
    const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ ping }&screenshot=false&strategy=${ strategy }&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg`

    https.get(get, (res) => {

      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
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
          throw new Error(e)
        }
      });
    }).on('error', (e) => {
      throw new Error(e);
    })
  })
}
