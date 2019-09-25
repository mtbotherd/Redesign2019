var News = (function ($, window, document, undefined) {

    'use strict';

    var init = function () {
        var newsStories = [];
        var titles = $('.articleDisplayTitle>a');
        var links = $('.articleDisplayTitle>a');
        var imgs = $('.articleDisplayAbstract img');

        for (var i = 0; i < 4; i++) {
            let title = titles[i] != undefined ? titles[i].text : 'Article';
            let link = links[i] != undefined ? links[i].href : '#';
            let img = imgs[i] != undefined ? imgs[i].src : '/img/placeholder-300x300.png';

            newsStories[i] = {
                title: title,
                link: link,
                img: img
            }
        }

        //TODO: add news to home page
    };

    return {
        init: init
    };

})(jQuery, window, document);
