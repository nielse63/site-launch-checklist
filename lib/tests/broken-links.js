
import blc from 'broken-link-checker'
import { getTestResults } from '../utils'
import { TIMEOUT_DELAY } from '../constants'

export default function (html, url) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject('Operation timed out')
    }, TIMEOUT_DELAY)

    let info = []
    const checker = new blc.HtmlChecker({
      filterLevel: 0,
      honorRobotExclusions: false,
    }, {
      link(result) {
        if (result.broken) {
          info.push(result.url.original)
        }
      },
      complete() {
        clearTimeout(timeout)

        info = [...new Set(info)]
        resolve(
          getTestResults(info, 'broken links'),
        )
      },
    })

    checker.scan(html, url)
  })
}
