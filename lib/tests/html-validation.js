
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
        const info = json.messages.reduce((acc, msg) => {
          if( msg.type === 'error' && acc.indexOf(msg.message) < 0 ) {
            acc.push(msg.message)
          }
          return acc
        }, [])

        resolve({
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
