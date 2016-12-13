
import { printTableHeader, killReport } from '../utils'

export default function (data) {
  killReport(data)

  console.log(printTableHeader(data.settings.url).join('\n'))
  console.log(JSON.stringify(data.output))
}
