
import validator from 'html-validator'
import { getTestResults } from '../utils'

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

        resolve(
          getTestResults(info, 'HTML errors')
        )
      } catch(e) {
        reject(e)
      }
    })
  })
}
