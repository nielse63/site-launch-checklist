
(function($) {

	window.data.suites.sort((a, b) => {
		if (a.index < b.index) {
			return -1;
		}
		if (a.index > b.index) {
			return 1;
		}
		return 0;
	});

	window.data.suites.forEach((suite, i) => {
		// console.log(suite);
		suite.tests = function() {
			const output = [];

			// print results
			suite.results.forEach((test) => {

				if( ! test.tests ) {
					console.warn(test);
					return;
				}

				if( ! test.tests.forEach ) {
					test.tests = [test.tests];
				}

				test.tests.forEach((section) => {
					if( ! section.values ) {
						const tmp = {
							name   : test.name,
							values : section
						}
						section = tmp;
					}
					const icon = test.passed ? '<i class="fa fa-check-circle-o"></i>' : '<i class="fa fa-exclamation"></i>';
					const $section = $(`<div class="${ test.passed ? 'passed' : 'failed' }" />`);
					const $table = $('<table class="table"><tbody /></table>');
					const type = {}.toString.call(section.values);
					let colspan = 1;

					if( type === '[object Object]' ) {

						for(const key in section.values) {

							let toPrint = '';
							const subType = {}.toString.call(section.values[key]);
							if( typeof section.values[key] === 'string' ) {
								toPrint = section.values[key];
							} else if( subType === '[object Array]' ) {
								const html = section.values[key].map((item) => {
									return `<p>${ item }</p>`;
								})
								toPrint = html.join('');
							} else {
								toPrint = String(section.values[key]);
							}

							$table.find('tbody').append([
								'<tr>',
								`<td>${ key }</td>`,
								`<td>${ toPrint }</td>`,
								'</tr>'
							].join(''));
							colspan = 2;
						}
					} else if( type === '[object Array]' && section.headers ) {
						const headers = section.headers;
						const headerKeys = Object.keys(headers);
						$table.prepend('<thead><tr /></thead>');
						headerKeys.forEach((th) => {
							$table.find('thead tr').append(`<th>${ headers[th] }</th>`);
						})
						section.values.forEach((row) => {
							const $tr = $('<tr />');
							colspan = headerKeys.length
							headerKeys.forEach((td) => {
								$tr.append(`<td>${ row[td] }</td>`);
							});
							$table.find('tbody').append($tr);
						});
					} else if( type === '[object Array]' ) {
						colspan = 1
						section.values.forEach((row) => {
							$table.find('tbody').append(`<tr><td>${ row }</td></tr>`);
						});
					} else if( typeof section.values === 'string' ) {
						colspan = 1
						let text = section.values;
						const $tmp = $(`<div>${ section.values }</div>`);
						$tmp.find('pre').each(function() {
							let _text = $(this).html();
							_text = _text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
							text = `<pre><code>${ _text }</code></pre>`;
						})
						$table.find('tbody').append(`<tr><td>${ text }</td></tr>`);
					}

					if( section.name ) {
						$table.append(`<thead><tr><th colspan="${ colspan }">${ icon } ${ section.name }</th></tr></thead>`);
					}

					if( $table.find('tbody tr').length ) {
						$section.append($table);
					}

					output.push( $section[0].outerHTML );
				});
			});

			return output.join('');
		}
	});
	const toRender = window.data;
	$('[type="x-tmpl-mustache"]').each((i, tpl) => {
		const template = $(tpl).html().trim();
		Mustache.parse(template);
		const rendered = Mustache.render(template, toRender);
		$(tpl).before(rendered);
	});

	$('.test-suite').each(function() {
		const $section = $(this);
		const $tests = $section.find('.passed, .failed');
		// var cls = $tests.first().attr('class');
		let classes = [];
		// if( $tests.length === 1 ) {
		// 	return;
		// }
		let passing = true;
		$tests.each((i, item) => {
			const cls = $(item).attr('class');
			if( classes.indexOf(cls) > -1 ) {
				return;
			}
			if( cls !== 'passed' ) {
				passing = false;
			}
			classes.push(cls);
		})
		if( ! $tests.length ) {
			classes = ['failed'];
			passing = false;
		}
		// var cls = $tests.first().attr('class');
		const icon = passing ? '<i class="fa fa-check-circle-o"></i>' : '<i class="fa fa-exclamation"></i>';
		$section.find('> h3').prepend(icon);
		$section.addClass(classes.join(' '));
	});

	$('table p + br').each(function() {
		$(this).remove()
	});

	$(document).trigger('content:ready');

}(window.jQuery));
