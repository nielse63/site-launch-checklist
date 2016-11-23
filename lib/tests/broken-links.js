
import blc from 'broken-link-checker'
import { getTestResults } from '../utils'

export default function(html, url) {
  return new Promise((resolve) => {

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
        info = [...new Set(info)]
        resolve(
          getTestResults(info, 'broken links')
        )
      }
    });

    checker.scan(html, url);
  })
}
