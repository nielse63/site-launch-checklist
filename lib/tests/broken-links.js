
import blc from 'broken-link-checker'

export default function(html, url) {
  return new Promise((resolve) => {

    let info = []
    const checker = new blc.HtmlChecker({
      filterLevel : 0,
      honorRobotExclusions : false
    }, {
      // html: function(tree, robots){
      //   console.log(arguments)
      // },
      link: function(result) {
        // console.log({
        //   queued : checker.numQueuedLinks(),
        //   active : checker.numActiveLinks(),
        // })
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
    checker.scan(html, url);
  })
}
