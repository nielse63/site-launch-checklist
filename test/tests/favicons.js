import assert from 'assert'
import _ from 'lodash'
import cheerio from 'cheerio'
import https from 'https'

import favicons from '../../lib/tests/favicons'

let $
let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/favicons', function () {

  before(function(done) {
    https.get(TEST_URL, (res) => {
      let data = '';
      res.on('data', (d) => {
        data += d.toString()
      });
      res.on('end', (d) => {
        $ = cheerio.load(data)
        output = favicons($)
        done()
      });
    }).on('error', (err) => {
      console.error(err)
    })
  })

  it('Favicons should throw error', function() {
    assert.throws(
      favicons.bind(null),
      /No cheerio object provided/
    )
  })

  it('Favicons should return object', function() {
    assert(
      _.isPlainObject(output)
    )
  })

  it('Favicons should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
