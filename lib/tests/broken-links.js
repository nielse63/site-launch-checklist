
import blc from 'broken-link-checker'
import { getTestResults } from '../utils'

export default function(html, url) {
  return new Promise((resolve, reject) => {

    const timeout = setTimeout(() => {
      reject('Operation timed out')
    }, 10000)

    let info = []
    const checker = new blc.HtmlChecker({
      filterLevel : 0,
      honorRobotExclusions : false
    }, {
      link: function(result) {
        if( result.broken ) {
          info.push(result.url.original)
        }
      },
      complete: function() {
        clearTimeout(timeout)
        info = [...new Set(info)]
        resolve(
          getTestResults(info, 'broken links')
        )
      }
    });

    checker.scan(html, url);
  })
}
