
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

	window.data.suites.forEach(function(suite, i) {
		// console.log(suite);
		suite.tests = function() {
			var output = [];

			// print results
			suite.results.forEach(function(test) {

				if( ! test.tests ) {
					console.warn(test);
					return;
				}

				if( ! test.tests.forEach ) {
					test.tests = [test.tests];
				}

				test.tests.forEach(function(section) {
					if( ! section.values ) {
						var tmp = {
							name : test.name,
							values : section
						}
						section = tmp;
					}
					var icon = test.passed ? '<i class="fa fa-check-circle-o"></i>' : '<i class="fa fa-exclamation"></i>';
					var $section = $('<div class="' + (test.passed ? 'passed' : 'failed') + '" />');
					var $table = $('<table class="table"><tbody /></table>');
					var type = {}.toString.call(section.values);
					var colspan = 1;

					if( type === '[object Object]' ) {

						for(var key in section.values) {

							var toPrint = '';
							var subType = {}.toString.call(section.values[key]);
							if( typeof section.values[key] === 'string' ) {
								toPrint = section.values[key];
							} else if( subType === '[object Array]' ) {
								var html = section.values[key].map(function(item) {
									return '<p>' + item + '</p>';
								})
								toPrint = html.join('');
							} else {
								toPrint = String(section.values[key]);
							}

							$table.find('tbody').append([
								'<tr>',
									'<td>' + key + '</td>',
									'<td>' + toPrint + '</td>',
								'</tr>'
							].join(''));
							colspan = 2;
						}
					} else if( type === '[object Array]' && section.headers ) {
						var headers = section.headers;
						var headerKeys = Object.keys(headers);
						$table.prepend('<thead><tr /></thead>');
						headerKeys.forEach(function(th) {
							$table.find('thead tr').append('<th>' + headers[th] + '</th>');
						})
						section.values.forEach(function(row) {
							var $tr = $('<tr />');
							colspan = headerKeys.length
							headerKeys.forEach(function(td) {
								$tr.append('<td>' + row[td] + '</td>');
							});
							$table.find('tbody').append($tr);
						});
					} else if( type === '[object Array]' ) {
						colspan = 1
						section.values.forEach(function(row) {
							$table.find('tbody').append('<tr><td>' + row + '</td></tr>');
						});
					} else if( typeof section.values === 'string' ) {
						colspan = 1
						var text = section.values;
						var $tmp = $('<div>' + section.values + '</div>');
						$tmp.find('pre').each(function() {
							var _text = $(this).html();
							_text = _text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
							text = '<pre><code>' + _text + '</code></pre>';
						})
						$table.find('tbody').append('<tr><td>' + text + '</td></tr>');
					}

					if( section.name ) {
						$table.append('<thead><tr><th colspan="' + colspan + '">' + icon + ' ' + section.name + '</th></tr></thead>');
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
	var toRender = window.data;
	$('[type="x-tmpl-mustache"]').each(function(i, tpl) {
		var template = $(tpl).html().trim();
		Mustache.parse(template);
		var rendered = Mustache.render(template, toRender);
		$(tpl).before(rendered);
	});

	$('.test-suite').each(function() {
		var $section = $(this);
		var $tests = $section.find('.passed, .failed');
		// var cls = $tests.first().attr('class');
		var classes = [];
		// if( $tests.length === 1 ) {
		// 	return;
		// }
		var passing = true;
		$tests.each(function(i, item) {
			var cls = $(item).attr('class');
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
		var icon = passing ? '<i class="fa fa-check-circle-o"></i>' : '<i class="fa fa-exclamation"></i>';
		$section.find('> h3').prepend(icon);
		$section.addClass(classes.join(' '));
	});

	$('table p + br').each(function() {
		$(this).remove()
	});

	$(document).trigger('content:ready');

})(window.jQuery);
