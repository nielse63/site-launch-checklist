
export default function(headers) {

  const shouldHave = function(_keys) {
    let passed = true
    const mustHave = ['x-xss-protection', 'x-frame-options']
    mustHave.forEach((key) => {
      if( _keys.indexOf(key) < 0 ) {
        passed = false
        return false
      }
    })

    return {
      passed : passed,
      reason : 'Missing necessary server response headers (X-XSS-Protection & X-Frame-Options)',
    }
  }

  const shouldntHave = function(_keys) {
    const forbidden = [
      'server',
      'x-pingback',
      'x-powered-by',
    ];
    let passed = true
    _keys.forEach((key) => {
      if( forbidden.indexOf(key) > -1 ) {
        passed = false
        return false
      }
    })

    return {
      passed : passed,
      reason : 'Server response headers contains one or more insecure headers (Server, X-Pingback, or X-Powered-By)',
    }
  }

  const keys = Object.keys(headers)
  let output = {
    passed : true,
    info : []
  }
  const tests = [
    shouldHave(keys),
    shouldntHave(keys),
  ]
  tests.forEach(object => {
    if( object.passed ) {
      return
    }
    output.passed = false
    output.info.push(object.reason)
  })
  output.reason = `${output.info.length} security ${output.info.length > 1 ? 'issues' : 'issue'} found`
  return output
}
