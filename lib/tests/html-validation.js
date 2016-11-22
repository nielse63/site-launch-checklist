
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
        let count = 0
        json.messages.forEach((message) => {
          if( message.type === 'error' ) {
            count++
          }
        })
        resolve({
          name : 'html-validation',
          passed : ! count,
          reason : `${count} HTML errors were found`
        })
      } catch(e) {
        reject(e)
      }
    })
  })
}
