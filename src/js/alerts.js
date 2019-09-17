var Alerts = (function ($, window, document, undefined) {

    'use strict';
    //alerts returned from web service
    var allAlerts = [];
    //array to hold route list and references to alerts
    var alertsByRoute = [];

    //build the array list of alerts ordered by route
    var buildAlerts = function (result) {

        //first sort all the alerts from newest to oldest
        result.sort(function (a, b) {
            a = parseInt(a.active_period.start);
            b = parseInt(b.active_period.start);
            return a > b ? -1 : a < b ? 1 : 0;
        });

        //loop through each alert from the Ajax result to build the alertsByRoute array
        result.forEach(function (alert, index) {
            //an array of "informed_entity" lists all the routes for this alert
            alert.informed_entity.forEach(function (entity, idx) {
                //the jQuery grep method will find the route of this informed_entity if it has
                //already been added to the alertsByRoute array
                let current = $.grep(alertsByRoute, function (alert) { return alert.route_id === entity.route_id })[0];

                //if the route_id of the current informed_entity hasn't already been added to the
                //alertsByRoute array, then we need to add it.
                if (current === undefined) {
                    //next we need to assign a sort order for this route so we display them in the correct order
                    //the METRO and rail lines need to be picked out and put where they belong
                    var sort = 0;
                    var icon = 'gray-outline-bus';
                    switch (entity.route_id) {
                        case '901': sort = 0, icon = 'blue-lrt';
                            break;
                        case '902': sort = 1, icon = 'green-lrt';
                            break;
                        case '903': sort = 2, icon = 'red-bus';
                            break;
                        case '921': sort = 3, icon = 'gray-bus';
                            break;
                        case '923': sort = 4, icon = 'gray-bus';
                            break;
                        case '992': sort = 5, icon = 'gray-bus';
                            break;
                        case '888': sort = 6, icon = 'gray-outline-train';
                            break;
                        //add 10 to the rest so routes 2,3,4,etc will follow the METRO and rail
                        default: sort = parseInt(entity.route_id) + 10;
                    }

                    //each item in alertsByRoute is an object, added here when the route doesn't already
                    //exist in the array. The index of the current alert of the alert array (Json result)
                    //is added to the alert_index property which is an array that will be added to each
                    //time we find an alert for this route
                    alertsByRoute.push({ sort_order: sort, route_id: entity.route_id, route_label: entity.route_label, icon: icon, alert_index: [index] });
                } else {
                    //here we already had the route of the current informed_entity in the alertsByRoute array, so all we
                    //need to do is add its index to the alert_index array property
                    current.alert_index.push(index);
                }
            });
        });

        //now that the alertsByRoute array is fully populated, build the HTML output
        outputAlerts(alertsByRoute, result);
    };

    var outputAlerts = function (list, alerts) {
        //first sort the alertsByRoute array by the sort_order assigned in the previous function
        list.sort(function (a, b) {
            a = a.sort_order;
            b = b.sort_order;
            return a < b ? -1 : a > b ? 1 : 0;
        });

        //loop through the array and output the route label, then loop through the alert_index array
        //and get the alert information for each alert for each route
        list.forEach(function (route, index) {
            var alertsDiv = $('<div/>', { class: 'accordion service-alerts' });
            var card = $('<div/>', { class: 'card' });

            var btn = $('<button type="button" class="btn d-flex align-items-center btn-block text-left collapsed" data-toggle="collapse" data-target="#route' + route.route_id + 'alerts" aria-expanded="false" />');
            btn.append($('<img class="icon circle-blue-lrt mr-2" src="/img/svg/circle-' + route.icon + '.svg">'));
            btn.append($('<span/>', { class: 'route-alert' }).text(route.route_label));
            btn.append($('<div/>', { class: 'ml-auto' })
                .append($('<span/>', { class: 'number-alerts' }).text(route.alert_index.length + ' Alert(s)'))
                .append($('<img/>', { class: 'icon chevron-down-blue ml-2', src: '/img/svg/chevron-down-blue.svg' }))
            );

            card.append($('<div/>', { class: 'card-header' }).append($('<h3/>', { class: 'mb-0' })).append(btn));

            var alertList = $('<div/>', { class: 'card-body border' });
            route.alert_index.forEach(function (alertIndex, idx) {
                alertList.append($('<p/>').append($('<a/>', { href: '#', id: 'this' + alertIndex + idx }).attr('data-index', alertIndex)
                    .text(alerts[alertIndex].header_text.translation[0].text)
                    .on('click', showAlertText)
                ));
            });

            card.append($('<div/>', { class: 'collapse', id: 'route' + route.route_id + 'alerts' }).append(alertList));
            alertsDiv.append(card);
            $('#alertsCard').append(alertsDiv);
        });

        allAlerts = alerts;
    };

    var showAlertText = function () {
        var idx = $(this).data('index');
        var alertHeading = $('<h3/>').text(allAlerts[$(this).data('index')].header_text.translation[0].text).prop('outerHTML');
        var routeList = $('<p/>').append($('<b/>').text('For the following route(s): ' + getAlertRouteList(idx))).prop('outerHTML');
        var alertText = allAlerts[idx].description_text.translation[0].text;
        $('#alertText').html(alertHeading + routeList + alertText);
        $('#alertTextModal').modal({ show: true });
        return false;
    }

    var getAlertRouteList = function (idx) {
        var routeList = [];
        allAlerts[idx].informed_entity.forEach(function (route, i) {
            var rt = $.grep(alertsByRoute, function (obj) { return obj.route_id === route.route_id; })[0];
            routeList.push({ sort_order: rt.sort_order, route_label: rt.route_label.replace('Route', '') });
        });

        routeList.sort(function (a, b) {
            a = a.sort_order;
            b = b.sort_order;
            return a < b ? -1 : a > b ? 1 : 0;
        });

        return routeList.map(function (el) { return el.route_label }).join(',');
    };

    var init = function () {
        //don't call web service if we already have alerts
        if (allAlerts.length > 0) return;
        //get all the alerts, convert to Json object and pass to buildAlerts method
        $.get('https://svc.metrotransittest.org/alerts/all')
            .done(function (result) {
                buildAlerts(JSON.parse(JSON.stringify(result)));
            });
    };

    return {
        init: init
    };

})(jQuery, window, document);
