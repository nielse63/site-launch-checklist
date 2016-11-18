
const $ = require('cheerio')
const _ = require('lodash')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'meta-tags',
	name : 'Meta Tags',
	docs : {
		description : 'Evaluates the site\'s meta tags for any errors or missing information',
		category    : 'SEO'
	},
	messaging : {
		success  : 'Your site has the following meta tags:\n\n<%= tags %>',
		fail     : '',
		howtofix : ''
	},
	context : 'HTML',
	output  : {
		type  : 'array',
		value : []
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const $body = ctx.get('DOMTree')
		const $tags = $body.find('meta, link:not([href*=".css"])')

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		const tags = []
		$tags.each((i, item) => {
			tags.push( $.html(item).trim() )
		})
		const compiled = _.template(mod.messaging.success)
		const maxlen = 75
		mod.messaging.success = compiled({
			tags : tags.map((_tag) => {
				const tag = '  ' + _tag
				if( tag.length > maxlen ) {
					return tag.substring(0, maxlen) + '...'
				}
				return tag
			}).join('\n')
		})
		mod.output.value = tags

		return mod;
	}
}

module.exports = mod
