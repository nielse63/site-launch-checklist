
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
            info.push(message.message)
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
