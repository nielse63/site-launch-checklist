import assert from 'assert'
import _ from 'lodash'
import cheerio from 'cheerio'
import https from 'https'

import favicons from '../../lib/tests/favicons'

let $
let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/favicons', () => {
  before(done => {
    https.get(TEST_URL, res => {
      let data = ''
      res.on('data', d => {
        data += d.toString()
      })
      res.on('end', () => {
        $ = cheerio.load(data)
        output = favicons($)
        done()
      })
    }).on('error', err => {
      throw new Error(err)
    })
  })

  it('Favicons should throw error', () => {
    assert.throws(
      favicons.bind(null),
      /No cheerio object provided/,
    )
  })

  it('Favicons should return object', () => {
    assert(
      _.isPlainObject(output),
    )
  })

  it('Favicons should have desired keys', () => {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
