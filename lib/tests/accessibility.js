
import pa11y from 'pa11y'

const createMessage = function(object) {
  return [
    object.message,
    `  Context: ${object.message}`,
  ].join('\r')
}

export default function(url) {
  const test = pa11y()

  return new Promise((resolve, reject) => {
    test.run(url, (err, data) => {
      if(err) {
        return reject(err)
      }
      const warnings = data.filter(message => {
        return message.type === 'warning'
      })
      const info = warnings.map(message => {
        return createMessage(message)
      })
      resolve({
        passed : ! warnings.length,
        reason : `This page does not meet the WCAG 2.0 recommendations - ${warnings.length} issues found`,
        info : info
      })
    })
  })
}
