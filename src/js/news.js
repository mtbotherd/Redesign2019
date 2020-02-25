var News = (function($, window, document, undefined) {
	'use strict';

	var init = function() {
		var newsStories = [];
		var titlelinks = $('.articleDisplayTitle>h2>a');
		var imgs = $('.articleDisplayAbstract img:first-child');

		for (var i = 0; i < 4; i++) {
			let title =
				titlelinks[i] != undefined ? titlelinks[i].text : 'Article';
			let link = titlelinks[i] != undefined ? titlelinks[i].href : '#';
			let img =
				imgs[i] != undefined
					? imgs[i].src
					: '/img/placeholder-300x300.png';

			newsStories[i] = {
				title: title,
				link: link,
				img: img,
			};
		}

		var newsDisplay = $('#news>div.custom-card-deck>div');

		$.each(newsDisplay, function(index, item) {
			$(item)
				.find('img.card-img-top')
				.attr('src', newsStories[index].img);
			$(item)
				.find('h4.card-title')
				.text(newsStories[index].title);
			$(item)
				.find('.card-footer a.btn')
				.attr('href', newsStories[index].link);
		});
	};

	return {
		init: init,
	};
})(jQuery, window, document);
