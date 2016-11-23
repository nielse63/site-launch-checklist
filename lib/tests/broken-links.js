
import blc from 'broken-link-checker'

export default function(html, url) {
  return new Promise((resolve) => {

    let info = []
    const htmlChecker = new blc.HtmlChecker({
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
        resolve({
          passed : ! info.length,
          reason : `${info.length} broken links found`,
          info : info
        })
      }
    });
    htmlChecker.scan(html, url);
  })
}
