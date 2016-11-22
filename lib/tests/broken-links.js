
import blc from 'broken-link-checker'
import { hasKey } from '../utils'

export default function(html, url) {
  return new Promise((resolve, reject) => {

    let count = 0
    let info = []
    const htmlChecker = new blc.HtmlChecker({
      filterLevel : 0,
      honorRobotExclusions : false
    }, {
      link: function(result) {
        if( result.broken ) {
          try {
            let reason = ''
            if( hasKey(blc, result.brokenReason) ) {
              reason = blc[result.brokenReason]
            } else if( hasKey(result, 'http') && hasKey(result.http, 'response') ) {
              reason = result.http.response.statusMessage
            }

            info.push({
              title : result.url.original,
              details : reason
            })
            count++
          } catch(e) {
            reject(e)
          }
        }
      },
      complete: function() {
        resolve({
          name : 'broken-links',
          passed : ! count,
          reason : `${count} broken links found`,
          info : info
        })
      }
    });
    htmlChecker.scan(html, url);
  })
}
