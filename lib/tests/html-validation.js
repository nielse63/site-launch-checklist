
import validator from 'html-validator'

export default function(html) {
  return new Promise((resolve, reject) => {

    validator({
      data : html
    }, (err, data) => {
      if(err) {
        return reject(err)
      }
      try {
        const json = JSON.parse(data)
        let info = []
        json.messages.forEach((message) => {
          if( message.type === 'error' ) {
            const start = message.hiliteStart
            const end = start + message.hiliteLength
            info.push({
              title : message.message,
              details : message.extract.substring(start, end),
              line : message.lastLine,
            })
          }
        })
        resolve({
          name : 'html-validation',
          passed : ! info.length,
          reason : `${info.length} HTML errors were found`,
          info : info
        })
      } catch(e) {
        reject(e)
      }
    })
  })
}
