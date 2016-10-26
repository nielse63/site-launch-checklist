
(function($) {
	$(document).one('content:ready', () => {
		const AFFIX_TOP_LIMIT = 300;
		const AFFIX_OFFSET = 49;
		const $menu = $("#menu");
		$("#menu-toggle").on("click", () => {
			$menu.toggleClass("open");
			return false;
		});
		$(".docs-nav").each((i, item) => {
			const $affixNav = $(item);
			const $container = $affixNav.parent();
			// console.log($container);
			let affixNavfixed = false;
			let current = null;
			const $links = $affixNav.find("a");

			function getClosestHeader(top) {
				let last = $links.first();
				if (top < AFFIX_TOP_LIMIT) {
					return last;
				}
				for (let i = 0; i < $links.length; i++) {
					const $link = $links.eq(i);
					const href = $link.attr("href");
					if (href.charAt(0) === "#" && href.length > 1) {
						const $anchor = $(href).first();
						if ($anchor.length > 0) {
							const offset = $anchor.offset();
							if (top < offset.top - AFFIX_OFFSET) {
								return last;
							}
							last = $link;
						}
					}
				}
				return last;
			}
			$(window).on("scroll", () => {
				const top = window.scrollY;
				const height = $affixNav.outerHeight();
				const max_bottom = $container.offset().top + $container.outerHeight();
				const bottom = top + height + AFFIX_OFFSET;
				if (affixNavfixed) {
					if (top <= AFFIX_TOP_LIMIT) {
						$affixNav.removeClass("fixed");
						$affixNav.css("top", 0);
						affixNavfixed = false;
					} else if (bottom > max_bottom) {
						$affixNav.css("top", (max_bottom - height) - top);
					} else {
						$affixNav.css("top", AFFIX_OFFSET);
					}
				} else if (top > AFFIX_TOP_LIMIT) {
					$affixNav.addClass("fixed");
					affixNavfixed = true;
				}
				const $current = getClosestHeader(top);
				if (current !== $current) {
					$affixNav.find(".active").removeClass("active");
					$current.addClass("active");
					current = $current;
				}
			});
		});
	});
}(window.jQuery));
