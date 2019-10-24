// StopServices handles formatting the results of an address
// autocomplete search on the stops-stations page.
//
// formatPage deletes an previous page results then:
// -- calls the Finder service to get any stop locations
//    near the requested address/location.
// -- If no results, it displays a message to that effect.
// -- Otherwise, it formats HTML with the information and constructs
//    a link to the interactive map page using the stop number
//    as a parameter
// See autocomplete.js for format of the user address location returned. But it should 
// looking like this:
/* {"address":"MOA",
    "location":{"x":481130.99999983935,"y":4966789.000100248},
    "score":100,
    "attributes":{"LongLabel":"MOA, Bloomington","Addr_type":"POI","PlaceName":"MOA","Place_addr":"Bloomington",
    "ATIS_ID":"SHP;28582;BLO;A;A;N"},
    "extent":{"xmin":481051.6572536851,"ymin":4966677.683843512,"xmax":481210.34001681313,"ymax":4966900.317349275}
    }
*/
// =============================================================
var StopServices = (function($,  window, document, undefined) {
    // This service requires map coordinates in UTM 
    function findNearestStops (findLoc) {
        return $.Deferred(function (dfd) {
            let address = 
            findLoc.address 
            + "|"
            + findLoc.location.y
            + "|"
            + findLoc.location.x
            + "|";
            let fromATIS = '0';
			if (findLoc.attributes.ATIS_ID.indexOf(';')>0) {
			    fromATIS += findLoc.attributes.ATIS_ID.split(';')[1];
            }
            address += fromATIS;
            let serviceData = {
                's-location': address
            }
            $.ajax({
				type: 'get',
				url: 'https://dev.metrotransittest.org/Services/ServiceFinderSvc.ashx',
				data: serviceData,
				dataType: "json"
            })
            .done(function (result, status, xhr) {
                if (result.error) {
                    dfd.reject({'Message': result.error});
                } else {
                    dfd.resolve(result);
                }
            })
            .fail(function(err) {
                dfd.reject("StopServiceFinder failed - No results " + err);
            });
        }).promise();
    }
    function formatPage (addressChoice) {
        $('#stopFinderResults').empty();
        findNearestStops(addressChoice) 
        .then(function(result){
            //console.dir(result);
            $('#stopFinderResults').append('<p class="result-msg">Transit service near ' + addressChoice.attributes.LongLabel +'</p>');
            for (let i = 0, l = result.length; i < l; i++) {
                let stop = result[i];
                let mapLink = 'https://dev.metrotransittest.org/imap/0/'+ stop.StopId;
                let serviceDetail = [];
                serviceDetail.push(`
                <div class="row">
                    <div class="col-lg-1">
                `);
                if (stop.Services[0].ServiceType === 0 || stop.Services[0].ServiceType === 1) {
                    serviceDetail.push('<img class="icon mb-4 mb-lg-0" src="/img/svg/circle-gray-outline-bus.svg" />');
                } else if (stop.Services[0].ServiceType === 2) {
                    if (stop.Services[0].Route === '901') {
                        serviceDetail.push('<img class="icon mb-4 mb-lg-0" src="/img/svg/circle-gray-lrt.svg" />');
                    } else if (stop.Services[0].Route === '902') {
                        serviceDetail.push('<img class="icon mb-4 mb-lg-0" src="/img/svg/circle-gray-lrt.svg" />');
                    }
                } else if (stop.Services[0].ServiceType === 3) {
                    serviceDetail.push('<img class="icon mb-4 mb-lg-0" src="/img/svg/circle-gray-outline-train.svg" />');
                }
                serviceDetail.push(`
                    </div>
                    <div class="col-lg-10">
                        <div class="transit-service">
                `);
                for (let j = 0, jl = stop.Services.length; j < jl; j++) {
                    let service = stop.Services[j];
                    let route = service.Route;
                    if (service.Route === '901') route = 'Blue';
                    if (service.Route === '902') route = 'Green';
                    if (service.Route === '903') route = 'Red';
                    if (service.Route === '904') route = 'Orange';
                    if (service.Route === '921') route = 'A Line';
                    if (service.Route === '923') route = 'C Line';
                    //if (service.Route === '888' || service.Route === '887' ) route = 'NorthStar';
                    //  src="/img/svg/circle-gray-outline-train.svg">
                    // img/svg/circle-green-outline-lrt.svg"/>':'<img class="icon" src="/img/svg/circle-blue-outline-lrt.svg"/>'}
                    serviceDetail.push(`<a href="https://dev.metrotransittest.org/route/${service.Route}" class="btn btn-outline-secondary routes">${route} ${service.Direction}</a>`);
                }
                serviceDetail.push('</div></div></div>');
                $('#stopFinderResults').append(`
                <div class="gray-100 p-4 mb-4">
                    <div class="row">
                        <div class="col-lg-7">
                            <h2>${stop.StopDescription}</h2>
                        </div>
                        <div class="col-lg-5">
                            <div class="row">
                                <div class="col-6">
                                    <p class="stop-id"><strong>Stop ID:</strong> ${stop.StopId}</p>
                                </div>
                                <div class="col-6 map">
                                    <p><a class="map-link" href="${mapLink}">Map</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${serviceDetail.join('')}
                </div>
                `);
            }
            if (result.length === 0) {
                $('#stopFinderResults').append('<p class="result-msg">No transit service available near ' + addressChoice.attributes.LongLabel +'</p>');
            }
        })
        .fail(function(err) {
            console.warn("StopServices failed to return results correctly");
        });
    }

    return {
        formatPage: formatPage
    };
})(jQuery, window, document);

$(function() {
    // This should execute when /park-ride-lots loads, it sets the autocomplete to trigger 
    // the page content when user selects a location to search
    if ($('#stopsStationsSearch').length) {
        AutocompleteAddress.getUserLocation()
        .then(function(userPos){
        // This one loads the Search field in the schedules-maps page -- the search result
        // automatically sets the map to zoom to the requested location
        AutocompleteAddress.init("stopsStationsSearch",/*UTMout*/ true, userPos,
            function() {
            var choice = AutocompleteAddress.getChoice("stopsStationsSearch");
            StopServices.formatPage(choice);
            }
        );
        })
        // we can't find the user's position so we'll return results 
        // in alphabetic order
        .fail(function(err) {
        // This one loads the Search field in the schedules-maps page -- the search result
        // automatically sets the map to zoom to the requested location
        AutocompleteAddress.init("stopsStationsSearch",/*UTMout*/ true, /*userPos*/ null,
            function() {
            var choice = AutocompleteAddress.getChoice("stopsStationsSearch");
            StopServices.formatPage(choice);
            }
        );
        });
    }
});
