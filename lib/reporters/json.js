
import _ from 'lodash'
import { printTableHeader } from '../utils'

export default function (data) {
  if (!_.isPlainObject(data)) {
    throw new Error('Supplied data is not a JavaScript object')
  }

  if (!_.has(data, 'output')) {
    throw new Error('Object does not have key `output`')
  }

  console.log(printTableHeader(data.settings.url).join('\n'))
  console.log(JSON.stringify(data.output))
}
