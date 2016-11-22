
import blc from 'broken-link-checker'

export default function(html, url) {
  return new Promise((resolve, reject) => {

    let count = 0
    const htmlChecker = new blc.HtmlChecker({
      filterLevel : 0,
      honorRobotExclusions : false
    }, {
      link: function(result){
        if( result.broken ) {
          count++
        }
      },
      complete: function() {
        resolve({
          name : 'broken-links',
          passed : ! count,
          reason : `${count} broken links found`
        })
      }
    });
    htmlChecker.scan(html, url);
  })
}
