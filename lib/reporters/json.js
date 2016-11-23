
import _ from 'lodash'

export default function(data) {
  if( ! _.isPlainObject(data) ) {
    throw new Error('Supplied data is not a JavaScript object')
  }

  if( ! _.has(data, 'output') ) {
    throw new Error('Object does not have key `output`')
  }

  console.log( JSON.stringify(data.output) )
}
