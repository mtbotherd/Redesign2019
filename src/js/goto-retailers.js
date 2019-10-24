// GoTo Retailers handles formatting the results of an address
// autocomplete search on the /goto-retailers page.
//
// formatPage deletes an previous page results then:
// -- calls the Finder service to get any Go-To Card retailt locations
//    near the requested address/location. Users can set options to determine
//    the Types of retailers to select.
// -- If no results, it displays a message to that effect.
// -- Otherwise, it formats HTML with the information and constructs
//    a link to the interactive map page using the x/y coordinates
//    for the location.
//
// See autocomplete.js for format of the user address choice returned. But is should 
// look like this:
/* {"address":"MOA",
    "location":{"x":481130.99999983935,"y":4966789.000100248},
    "score":100,
    "attributes":{"LongLabel":"MOA, Bloomington","Addr_type":"POI","PlaceName":"MOA","Place_addr":"Bloomington",
    "ATIS_ID":"SHP;28582;BLO;A;A;N"},
    "extent":{"xmin":481051.6572536851,"ymin":4966677.683843512,"xmax":481210.34001681313,"ymax":4966900.317349275}
    }
*/

var GoToRetailerServices = (function($,  window, document, undefined) {
    // This service requires map coordinates in UTM 
    function findNearestGoToRetailers (findLoc, options) {
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
                'category' : options,
                's-location': address
            }
            // if there's more than 1 options, pass an extra parameter
            if (options.indexOf(',') > -1) { 
               serviceData.typegroup = 'AND'; 
            }
            $.ajax({
				type: 'get',
				url: 'https://dev.metrotransittest.org/Services/FinderSvc.ashx',
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
                dfd.reject("gotoCard Retailer search failed - No results " + err);
            });
        }).promise();
    }
    function formatPage (addressChoice) {
        $('#goto-finder-results').empty();
        var work = [];
        $('#moreOptions input:checked').each(function() {
            work.push(this.id);
        });
        var options = work.join();
        
        findNearestGoToRetailers(addressChoice, options)
        .then(function(results){
            //console.dir(results);
            $('#goto-finder-results').append('<p class="result-msg">Nearest Go-To Card Retailers to '+addressChoice.attributes.LongLabel+'</p>');

            for (let i=0, l=results.length;i < l; i++) {
                let stop = results[i];
                // create map link
                let ptlatlon = [];
                CoordinateConversion.UTMXYToLatLon(parseFloat(stop.Y), parseFloat(stop.X), 15, false, ptlatlon);
                var longitude = CoordinateConversion.RadToDeg(ptlatlon[1]).toFixed(4);
                var latitude = CoordinateConversion.RadToDeg(ptlatlon[0]).toFixed(4);
                let mapLink = 'https://dev.metrotransittest.org/imap/interactivemap.aspx?x='+longitude+'&y='+latitude;

                $('#goto-finder-results').append(`
                <div class="card">
                    <a href="${mapLink}" class="d-flex btn">
                        <span class="d-flex">${stop.LocationName}&nbsp;(${stop.Distance}&nbsp;mi.)</span>
                        <div class="d-flex ml-auto">
                            <span class="cyan map">Map</span>
                            <img class="icon arrow-right-blue mr-0" src="./img/svg/arrow-right-blue.svg"/>
                        </div>
                    </a> 
                </div>							
                `);
            }
            if (results.length === 0) {
                $('#pr-finder-results').append('<p class="result-msg">No Go-To Card retailers close to '+addressChoice.address+'</p>');
            }

        })
        .fail(function(err) {
            $('#pr-finder-results').append('<p class="result-msg">No Go-To Card retailers close to '+addressChoice.address+'</p>');
        });
    }

    return {
        formatPage: formatPage
    };
})(jQuery, window, document);

$(function() {
    // This should execute when /park-ride-lots loads, it sets the autocomplete to trigger 
    // the page content when user selects a location to search
    if ($('#gotoCardRetailers').length) {
        AutocompleteAddress.getUserLocation()
        .then(function(userPos){
            AutocompleteAddress.init("gotoCardRetailerSearch",/*UTMout*/ true, userPos,
                function() {
                    var choice = AutocompleteAddress.getChoice("gotoCardRetailerSearch");
                    GoToRetailerServices.formatPage(choice);
                }
            );
            })
            // we can't find the user's position so we'll return results 
            // in alphabetic order
        .fail(function(err) {
            AutocompleteAddress.init("gotoCardRetailerSearch",/*UTMout*/ true, /*userPos*/null,
                function() {
                    var choice = AutocompleteAddress.getChoice("gotoCardRetailerSearch");
                    GoToRetailerServices.formatPage(choice);
                }
            );
        });
    }
});
