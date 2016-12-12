
import pa11y from 'pa11y'

export default function(url) {
  const test = pa11y({
    ignore: [
      'notice',
      'warning',
    ]
  })

  return new Promise((resolve, reject) => {
    test.run(url, (err, data) => {
      if(err) {
        return reject(err)
      }

      const info = [...new Set(data.map(msg => {
        return msg.message
      }))]
      resolve({
        passed : ! info.length,
        reason : `This page does not meet the WCAG 2.0 recommendations - ${info.length} unique issues found`,
        info : info,
      })
    })
  })
}
