var CoordinateConversion = (function () {
    /* Code found here: http://home.hiwaay.net/~taylorc/toolbox/geography/geoutm.html
       Copyright 1997-1998 by Charles L. Taylor 
    */
    const pi = 3.14159265358979;
    /* Ellipsoid model constants (actual values here are for WGS84) */
    const sm_a = 6378137.0;
    const sm_b = 6356752.314;
    const sm_EccSquared = 6.69437999013e-03;
    const UTMScaleFactor = 0.9996;
    /*
    * ArcLengthOfMeridian
    *
    * Computes the ellipsoidal distance from the equator to a point at a
    * given latitude.
    *
    * Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
    * GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
    *
    * Inputs:
    *     phi - Latitude of the point, in radians.
    *
    * Globals:
    *     sm_a - Ellipsoid model major axis.
    *     sm_b - Ellipsoid model minor axis.
    *
    * Returns:
    *     The ellipsoidal distance of the point from the equator, in meters.
    *
    */
    function ArcLengthOfMeridian(phi) {
        var alpha, beta, gamma, delta, epsilon, n;
        var result;

        /* Precalculate n */
        n = (sm_a - sm_b) / (sm_a + sm_b);

        /* Precalculate alpha */
        alpha = ((sm_a + sm_b) / 2.0)
            * (1.0 + (Math.pow(n, 2.0) / 4.0) + (Math.pow(n, 4.0) / 64.0));

        /* Precalculate beta */
        beta = (-3.0 * n / 2.0) + (9.0 * Math.pow(n, 3.0) / 16.0)
            + (-3.0 * Math.pow(n, 5.0) / 32.0);

        /* Precalculate gamma */
        gamma = (15.0 * Math.pow(n, 2.0) / 16.0)
            + (-15.0 * Math.pow(n, 4.0) / 32.0);

        /* Precalculate delta */
        delta = (-35.0 * Math.pow(n, 3.0) / 48.0)
            + (105.0 * Math.pow(n, 5.0) / 256.0);

        /* Precalculate epsilon */
        epsilon = (315.0 * Math.pow(n, 4.0) / 512.0);

        /* Now calculate the sum of the series and return */
        result = alpha
            * (phi + (beta * Math.sin(2.0 * phi))
                + (gamma * Math.sin(4.0 * phi))
                + (delta * Math.sin(6.0 * phi))
                + (epsilon * Math.sin(8.0 * phi)));

        return result;
    }
    /*
    * UTMCentralMeridian
    *
    * Determines the central meridian for the given UTM zone.
    *
    * Inputs:
    *     zone - An integer value designating the UTM zone, range [1,60].
    *
    * Returns:
    *   The central meridian for the given UTM zone, in radians, or zero
    *   if the UTM zone parameter is outside the range [1,60].
    *   Range of the central meridian is the radian equivalent of [-177,+177].
    *
    */
    function UTMCentralMeridian(zone) {
        var cmeridian;
        //console.log(zone);
        //console.log(-183 + (zone * 6.0));
        cmeridian = DegToRad(-183.0 + (zone * 6.0));

        return cmeridian;
    }
    /*
    * FootpointLatitude
    *
    * Computes the footpoint latitude for use in converting transverse
    * Mercator coordinates to ellipsoidal coordinates.
    *
    * Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
    *   GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
    *
    * Inputs:
    *   y - The UTM northing coordinate, in meters.
    *
    * Returns:
    *   The footpoint latitude, in radians.
    *
    */
    function FootpointLatitude(y) {
        var y_, alpha_, beta_, gamma_, delta_, epsilon_, n;
        var result;

        /* Precalculate n (Eq. 10.18) */
        n = (sm_a - sm_b) / (sm_a + sm_b);

        /* Precalculate alpha_ (Eq. 10.22) */
        /* (Same as alpha in Eq. 10.17) */
        alpha_ = ((sm_a + sm_b) / 2.0)
            * (1 + (Math.pow(n, 2.0) / 4) + (Math.pow(n, 4.0) / 64));

        /* Precalculate y_ (Eq. 10.23) */
        y_ = y / alpha_;

        /* Precalculate beta_ (Eq. 10.22) */
        beta_ = (3.0 * n / 2.0) + (-27.0 * Math.pow(n, 3.0) / 32.0)
            + (269.0 * Math.pow(n, 5.0) / 512.0);

        /* Precalculate gamma_ (Eq. 10.22) */
        gamma_ = (21.0 * Math.pow(n, 2.0) / 16.0)
            + (-55.0 * Math.pow(n, 4.0) / 32.0);

        /* Precalculate delta_ (Eq. 10.22) */
        delta_ = (151.0 * Math.pow(n, 3.0) / 96.0)
            + (-417.0 * Math.pow(n, 5.0) / 128.0);

        /* Precalculate epsilon_ (Eq. 10.22) */
        epsilon_ = (1097.0 * Math.pow(n, 4.0) / 512.0);

        /* Now calculate the sum of the series (Eq. 10.21) */
        result = y_ + (beta_ * Math.sin(2.0 * y_))
            + (gamma_ * Math.sin(4.0 * y_))
            + (delta_ * Math.sin(6.0 * y_))
            + (epsilon_ * Math.sin(8.0 * y_));

        return result;
    }
    /*
    * MapLatLonToXY
    *
    * Converts a latitude/longitude pair to x and y coordinates in the
    * Transverse Mercator projection.  Note that Transverse Mercator is not
    * the same as UTM; a scale factor is required to convert between them.
    *
    * Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
    * GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
    *
    * Inputs:
    *    phi - Latitude of the point, in radians.
    *    lambda - Longitude of the point, in radians.
    *    lambda0 - Longitude of the central meridian to be used, in radians.
    *
    * Outputs:
    *    xy - A 2-element array containing the x and y coordinates
    *         of the computed point.
    *
    * Returns:
    *    The function does not return a value.
    *
    */
    function MapLatLonToXY(phi, lambda, lambda0, xy) {
        var N, nu2, ep2, t, t2, l;
        var l3coef, l4coef, l5coef, l6coef, l7coef, l8coef;
        var tmp;

        /* Precalculate ep2 */
        ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0)) / Math.pow(sm_b, 2.0);

        /* Precalculate nu2 */
        nu2 = ep2 * Math.pow(Math.cos(phi), 2.0);

        /* Precalculate N */
        N = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nu2));

        /* Precalculate t */
        t = Math.tan(phi);
        t2 = t * t;
        tmp = (t2 * t2 * t2) - Math.pow(t, 6.0);

        /* Precalculate l */
        l = lambda - lambda0;

        /* Precalculate coefficients for l**n in the equations below
           so a normal human being can read the expressions for easting
           and northing
           -- l**1 and l**2 have coefficients of 1.0 */
        l3coef = 1.0 - t2 + nu2;

        l4coef = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2);

        l5coef = 5.0 - 18.0 * t2 + (t2 * t2) + 14.0 * nu2
            - 58.0 * t2 * nu2;

        l6coef = 61.0 - 58.0 * t2 + (t2 * t2) + 270.0 * nu2
            - 330.0 * t2 * nu2;

        l7coef = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - (t2 * t2 * t2);

        l8coef = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - (t2 * t2 * t2);

        /* Calculate easting (x) */
        xy[0] = N * Math.cos(phi) * l
            + (N / 6.0 * Math.pow(Math.cos(phi), 3.0) * l3coef * Math.pow(l, 3.0))
            + (N / 120.0 * Math.pow(Math.cos(phi), 5.0) * l5coef * Math.pow(l, 5.0))
            + (N / 5040.0 * Math.pow(Math.cos(phi), 7.0) * l7coef * Math.pow(l, 7.0));

        /* Calculate northing (y) */
        xy[1] = ArcLengthOfMeridian(phi)
            + (t / 2.0 * N * Math.pow(Math.cos(phi), 2.0) * Math.pow(l, 2.0))
            + (t / 24.0 * N * Math.pow(Math.cos(phi), 4.0) * l4coef * Math.pow(l, 4.0))
            + (t / 720.0 * N * Math.pow(Math.cos(phi), 6.0) * l6coef * Math.pow(l, 6.0))
            + (t / 40320.0 * N * Math.pow(Math.cos(phi), 8.0) * l8coef * Math.pow(l, 8.0));

        return;
    }
    /*
    * MapXYToLatLon
    *
    * Converts x and y coordinates in the Transverse Mercator projection to
    * a latitude/longitude pair.  Note that Transverse Mercator is not
    * the same as UTM; a scale factor is required to convert between them.
    *
    * Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
    *   GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
    *
    * Inputs:
    *   x - The easting of the point, in meters.
    *   y - The northing of the point, in meters.
    *   lambda0 - Longitude of the central meridian to be used, in radians.
    *
    * Outputs:
    *   philambda - A 2-element containing the latitude and longitude
    *               in radians.
    *
    * Returns:
    *   The function does not return a value.
    *
    * Remarks:
    *   The local variables Nf, nuf2, tf, and tf2 serve the same purpose as
    *   N, nu2, t, and t2 in MapLatLonToXY, but they are computed with respect
    *   to the footpoint latitude phif.
    *
    *   x1frac, x2frac, x2poly, x3poly, etc. are to enhance readability and
    *   to optimize computations.
    *
    */
    function MapXYToLatLon(x, y, lambda0, philambda) {
        var phif, Nf, Nfpow, nuf2, ep2, tf, tf2, tf4, cf;
        var x1frac, x2frac, x3frac, x4frac, x5frac, x6frac, x7frac, x8frac;
        var x2poly, x3poly, x4poly, x5poly, x6poly, x7poly, x8poly;

        /* Get the value of phif, the footpoint latitude. */
        phif = FootpointLatitude(y);

        /* Precalculate ep2 */
        ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0))
            / Math.pow(sm_b, 2.0);

        /* Precalculate cos (phif) */
        cf = Math.cos(phif);

        /* Precalculate nuf2 */
        nuf2 = ep2 * Math.pow(cf, 2.0);

        /* Precalculate Nf and initialize Nfpow */
        Nf = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nuf2));
        Nfpow = Nf;

        /* Precalculate tf */
        tf = Math.tan(phif);
        tf2 = tf * tf;
        tf4 = tf2 * tf2;

        /* Precalculate fractional coefficients for x**n in the equations
           below to simplify the expressions for latitude and longitude. */
        x1frac = 1.0 / (Nfpow * cf);

        Nfpow *= Nf;   /* now equals Nf**2) */
        x2frac = tf / (2.0 * Nfpow);

        Nfpow *= Nf;   /* now equals Nf**3) */
        x3frac = 1.0 / (6.0 * Nfpow * cf);

        Nfpow *= Nf;   /* now equals Nf**4) */
        x4frac = tf / (24.0 * Nfpow);

        Nfpow *= Nf;   /* now equals Nf**5) */
        x5frac = 1.0 / (120.0 * Nfpow * cf);

        Nfpow *= Nf;   /* now equals Nf**6) */
        x6frac = tf / (720.0 * Nfpow);

        Nfpow *= Nf;   /* now equals Nf**7) */
        x7frac = 1.0 / (5040.0 * Nfpow * cf);

        Nfpow *= Nf;   /* now equals Nf**8) */
        x8frac = tf / (40320.0 * Nfpow);

        /* Precalculate polynomial coefficients for x**n.
           -- x**1 does not have a polynomial coefficient. */
        x2poly = -1.0 - nuf2;

        x3poly = -1.0 - 2 * tf2 - nuf2;

        x4poly = 5.0 + 3.0 * tf2 + 6.0 * nuf2 - 6.0 * tf2 * nuf2
            - 3.0 * (nuf2 * nuf2) - 9.0 * tf2 * (nuf2 * nuf2);

        x5poly = 5.0 + 28.0 * tf2 + 24.0 * tf4 + 6.0 * nuf2 + 8.0 * tf2 * nuf2;

        x6poly = -61.0 - 90.0 * tf2 - 45.0 * tf4 - 107.0 * nuf2
            + 162.0 * tf2 * nuf2;

        x7poly = -61.0 - 662.0 * tf2 - 1320.0 * tf4 - 720.0 * (tf4 * tf2);

        x8poly = 1385.0 + 3633.0 * tf2 + 4095.0 * tf4 + 1575 * (tf4 * tf2);

        /* Calculate latitude */
        philambda[0] = phif + x2frac * x2poly * (x * x)
            + x4frac * x4poly * Math.pow(x, 4.0)
            + x6frac * x6poly * Math.pow(x, 6.0)
            + x8frac * x8poly * Math.pow(x, 8.0);

        /* Calculate longitude */
        philambda[1] = lambda0 + x1frac * x
            + x3frac * x3poly * Math.pow(x, 3.0)
            + x5frac * x5poly * Math.pow(x, 5.0)
            + x7frac * x7poly * Math.pow(x, 7.0);

        return;
    }
    /*
    * LatLonToUTMXY
    *
    * Converts a latitude/longitude pair to x and y coordinates in the
    * Universal Transverse Mercator projection.
    *
    * Inputs:
    *   lat - Latitude of the point, in radians.
    *   lon - Longitude of the point, in radians.
    *   zone - UTM zone to be used for calculating values for x and y.
    *          If zone is less than 1 or greater than 60, the routine
    *          will determine the appropriate zone from the value of lon.
    *
    * Outputs:
    *   xy - A 2-element array where the UTM x and y values will be stored.
    *
    * Returns:
    *   The UTM zone used for calculating the values of x and y.
    *
    */
    const LatLonToUTMXY = function (lat, lon, zone, xy) {
        MapLatLonToXY(lat, lon, UTMCentralMeridian(zone), xy);

        /* Adjust easting and northing for UTM system. */
        xy[0] = xy[0] * UTMScaleFactor + 500000.0;
        xy[1] = xy[1] * UTMScaleFactor;
        if (xy[1] < 0.0)
            xy[1] = xy[1] + 10000000.0;

        return zone;
    };
    /*
    * UTMXYToLatLon
    *
    * Converts x and y coordinates in the Universal Transverse Mercator
    * projection to a latitude/longitude pair.
    *
    * Inputs:
    *	x - The easting of the point, in meters.
    *	y - The northing of the point, in meters.
    *	zone - The UTM zone in which the point lies.
    *	southhemi - True if the point is in the southern hemisphere;
    *               false otherwise.
    *
    * Outputs:
    *	latlon - A 2-element array containing the latitude and
    *            longitude of the point, in radians.
    *
    * Returns:
    *	The function does not return a value.
    *
    */
    const UTMXYToLatLon = function (x, y, zone, southhemi, latlon) {
        var cmeridian;
        //console.log("X: " + x)
        //console.log("Y: " + y)
        x -= 500000.0;
        //console.log("X: " + x)
        x /= UTMScaleFactor;
        //console.log("X: " + x)

        /* If in southern hemisphere, adjust y accordingly. */
        //if (southhemi) { y -= 10000000.0; }

        y /= UTMScaleFactor;

        cmeridian = UTMCentralMeridian(zone);
        //console.log("central meridian " + cmeridian);
        //console.log("X: " + x)
        //console.log("Y: " + y)
        MapXYToLatLon(x, y, cmeridian, latlon);
        //console.log("latlon: " + latlon);	
        return;
    };
    /*
    * DegToRad
    *
    * Converts degrees to radians.
    *
    */
    const DegToRad = function (deg) {
        return deg / 180.0 * pi;
    };
    /*
    * RadToDeg
    *
    * Converts radians to degrees.
    *
    */
    const RadToDeg = function (rad) {
        return rad / pi * 180.0;
    };
    return {
        UTMXYToLatLon: UTMXYToLatLon,
        LatLonToUTMXY: LatLonToUTMXY,
        DegToRad: DegToRad,
        RadToDeg: RadToDeg
    };
})();

var TRIM = (function ($, window, document, undefined) {
    var MAP = null; // this is the main MAP object 
    var GEOLOCATE = null; // this is the locate button object

    var _bubbleSort = function (inputArr) {
        var swapped;
        do {
            swapped = false;
            for (let i = 0, l = inputArr.length; i < l; i++) {
                if (inputArr[i] > inputArr[i + 1]) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    };
    var _isValue = function (x) {
        // tests if value is NOT empty AND NOT blank and NOT NULL
        var str = x.toString(); // this allows zero to test as a valid value
        //console.write("test value is " + x)
        if (str) {
            return /\S/.test(str);
        }
        return false;
    };
    var _isNumber = function (x) {
        // tests if value is any sort of number with +/- or decimals
        if (_isValue(x)) {
            return !isNaN(x - 0);
        }
        return false;
    };
    var zoomToBBox = function (/*string*/parm) {
        require(["esri/geometry/Extent"], function (Extent) {
            //console.log("zoomToBBox says: " + setBBoxURL_value);
            if (parm) {
                var newE;
                var e = parm.split(",");
                if (e.length === 4) {
                    if (_isNumber(e[0]) && _isNumber(e[1]) && _isNumber(e[2]) && _isNumber(e[3])) {
                        newE = new Extent({ "xmin": parseFloat(e[1]), "ymin": parseFloat(e[0]), "xmax": parseFloat(e[3]), "ymax": parseFloat(e[2]), "spatialReference": MAP.spatialReference });
                        MAP.setExtent(newE,/*fit?*/true);
                    }
                }
                else if (e.length === 2) {
                    if (_isNumber(e[0]) && _isNumber(e[1])) {
                        newE = new Extent({ "xmin": parseFloat(e[1]), "ymin": parseFloat(e[0]), "xmax": parseFloat(e[1]) + 2, "ymax": parseFloat(e[0]) + 2, "spatialReference": MAP.spatialReference });
                        MAP.setExtent(newE,/*fit?*/true);
                    }
                }
            }
        });
    };
    /* ==============================================================================
     * External Called Functions
     * 
     * These all need to be available from the outside
     * ==============================================================================
     */
    // this is the external call to have the map zoom to the user's location
    var geoLocate = function () {
        GEOLOCATE.locate();
    };
    var centerMarkerAtPoint = function (/*float*/x, /*float*/y,/*int*/zoomLevel) {  // x = longitude, y = latitude
        MAP.graphics.clear();
        require([
            "esri/graphic",
            "esri/geometry/Point",
            "esri/symbols/PictureMarkerSymbol"
        ], function (Graphic, Point, PictureMarkerSymbol
        ) {
                var p = new Point(x, y);
                var g = new Graphic();
                g.setGeometry(p);
                //var stopSymbol = new PictureMarkerSymbol('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjBBNTJGNjgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjk3MjdFNDgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCMEE1MkY0ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCMEE1MkY1ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Mp+ygwAAA2VJREFUeNqsVs9PU0EQ3vejVLEoUhAQUOMFCIn1YVJ6MHLzRk3gbEpMkIjGu/8Fh1ZN0JrGM2n0wMGjF8REbKuJ8WJEQ4vFKAGFltI+Z5rZZljfg4JO8uX1bd/ut7M7881owt00lyf/bbMxm73bboua+xBJ6Oy3SqiiomxiT0K+qM5gKO98wQqhTE+Nno7emg5kGiMxFRjMW8HIdhSU2QZ2kZoOZAbBA2hQwEltRlYCbDOUmCO7SNUjlZ7h4l7AEcBRenojkUjP2NjYYHt7ewd+nM/nc8lk8k08Hv8CrwUFwo1UHqFJCx8HnAKcAwwAgtPT03ez2exioVCwEa8//6hCvudyucVoNHobvrUAvYBugB/go40b8hrUO2sg0kZAE2J+fn7Ssqzxl0sbIvpqRTz/+HPX1sO9J8WdUIe4crZJZDKZeDAYvA/Dvwhb5G2J7tTWWOSZCtkJILuFZBPPPomn6e9iL7seaBUz186LdDodHxoaisHQOpFu0r1Wg8lggWKS+3hnPjjGyyMjI/fqIUPLfNsUS2tFMTHcb3V2dmbm5uayLFplxNqcDI/zGN1hM9zZw/cbHutq4oM4iL2I9IsB33aqq6vrJryukac1L3WWFrXcw2hsaWmx8M4OajjH7/dfHB8f7yEnPCxoNF1JiSophj4OqAFSj8k5o6Ojl5S81YWLRuqYZ5mVTXFYw7ltbW2nneRQd/jeFv/fbE6oKn0FFeRCR+OhV8e5q6urWaa1tdKlO6j+DsqVTOqDmpwzOzu7yIS8wmXNYCojk74Z5Grm3br5L2kxqaRFUaaFdLdMO8J8KcAOH6NcoYLUa/gtzoETekSSVlS9NJTyVIsqUIp8OBz2TAz3WaggqCT1SFsqlXoCKZGEod/Ms5K8MrUOekjeGknpfQsLC1OBQOBGPeKNZKFQ6AEMbzAdLTLxrvBqbxCZj0pLN5WawVgsNrW8vPzWrTzhf1SeMNn7AGcArRQPXt4paA5Hyj2VBbhahFGuUEEoqauhj9GYSCS+0p1tsZIkPdvhqaE59DS6Q4vhVdoMnVVy2WIUCbLF4MdYcWoxbKUdUBc0mRBzwjJrnkpKI2WryqW59KWqtzrLV11RKN4mltlvx8ZYq6Pr1h2ewqERrrg0xmI/D/frwt3E2XZo/f+yPwIMACLRpTLsc+73AAAAAElFTkSuQmCC', 30, 30);
                // MyGPS_location.png the blue dot
                var stopSymbol = new PictureMarkerSymbol('/img/svg/map-icons/pin-red.svg', 20, 24);
                stopSymbol.setOffset(0, 15);
                g.setSymbol(stopSymbol);
                MAP.graphics.add(g);
                MAP.centerAndZoom(p, zoomLevel);
            });
    };
    var toggleLayer = function (/*string*/layer, /*integer*/zoomLevel) {
        var l = MAP.getLayer(layer);
        if (l) {
            if (l.visible) {
                l.hide();
            } else {
                l.show();
                if (zoomLevel) {
                    //MAP.setExtent(l.fullExtent, true);
                    MAP.setZoom(zoomLevel);
                }
            }
        } else {
            console.warn("ToggleLayer: " + layer + " not found.");
        }
    };

    // 
    // Pass a route parameter to show the route(s) stops
    // Pass nothing to clear them
    //
    var drawRouteStops = function (/*[string]*/routes) {
        var routeStopLayer = MAP.getLayer("routeStops");
        if (!routeStopLayer) return;
        // queries are defined as an array for layers in a service
        var query = [];
        var x = "";
        if (routes) {
            //console.dir(routes);
            //routes = routes.filter(function (value, idx, arr) {
            //    return value !== "906"; // remove 906 from list
            //});
            for (let i = 0, rl = routes.length; i < rl; i++) {
                if (i > 0) {
                    x += " or ";
                }
                // Example: ROUTES LIKE '% 3 %' or ROUTES LIKE '3 %' or
                //          ROUTES LIKE '% 3' or ROUTES = '3'
                x += "ROUTES LIKE '% " + routes[i] + " %' or ";
                x += "ROUTES LIKE '" + routes[i] + " %' or ";
                x += "ROUTES LIKE '% " + routes[i] + "' or ";
                x += "ROUTES = '" + routes[i] + "'";
            }
        } else {
            x = "1=0"; // show NO STOPS
        }
        query[0] = x;  // zero is the layer id for routeStops in the service
        routeStopLayer.setLayerDefinitions(query);
    };

    //
    // pass routes array to highlight those routes in color
    // pass nothing to clear them off
    // 
    var drawRoutes = function (/*[string]*/routes, zoom) {
        zoom = typeof zoom !== 'undefined' ? zoom : false;
        var routeLayer = MAP.getLayer("routes");
        if (!routeLayer) return;

        var routesQuery = [];
        routesQuery[4] = "1=0";
        if (routes) {
            routes = routes.filter(function (value, idx, arr) {
                return value !== "906"; // remove 906 from list
            });
            var queryWhere = "ROUTENUMBER in (";
            for (i = 0, l = routes.length; i < l; i++) {
                if (i > 0) {
                    queryWhere += ",";
                }
                queryWhere += routes[i];
            }
            queryWhere += ")";
            routesQuery[4] = queryWhere; // query for sublayer 4
        }
        routeLayer.setLayerDefinitions(routesQuery);
        // route(s) should now be displaying
        if (routes && zoom) {
            // This routine does nothing more than extract the line features for the 
            // requested routes and determine the extent of the features
            // by unioning their extents and then it zooms to the extent
            $.ajax({
                type: "get",
                url: routeLayer.url + "/4/query",
                data: {
                    where: queryWhere,
                    returnGeometry: true,
                    outFields: "ROUTENUMBER",
                    f: "json"
                },
                dataType: "json"
            })
                .done(function (result, status, xhr) {
                    if (result.features.length > 0) {
                        require(["esri/geometry/Polyline"],
                            function (Polyline) {
                                var extent;
                                for (let i = 0, l = result.features.length; i < l; i++) {
                                    var g = new Polyline({
                                        paths: result.features[i].geometry.paths,
                                        spatialReference: result.spatialReference
                                    });
                                    if (i === 0) {
                                        extent = g.getExtent();
                                    } else {
                                        extent = extent.union(g.getExtent());
                                    }
                                }
                                MAP.setExtent(extent, true);
                            });
                    }
                })
                .fail(function (err) {
                    console.warn("Routes fatal error fetching polylines: " + err.Message);
                });
        }
    };
    var drawTrip = function (/*int*/tripToDraw,/*object*/tripPlan,/*boolean*/zoomToTripExtent) {
        require([
            "esri/graphic",
            "esri/InfoTemplate",
            "esri/Color",
            "esri/geometry/Extent",
            "esri/geometry/Point",
            "esri/geometry/Polyline",
            "esri/geometry/webMercatorUtils",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/CartographicLineSymbol"
        ], function (
            Graphic,
            InfoTemplate,
            Color,
            Extent,
            Point,
            Polyline,
            webMercatorUtils,
            PictureMarkerSymbol,
            CartographicLineSymbol
        ) {
                /*
                * drawTripStop
                * StopObj = StopID and StopLocation(LocationName, UTMx, UTMy)
                * stopGraphicType = "Transfer,Board,Exit"
                */
                var drawTripStop = function (StopObj, /*string*/stopGraphicType) {
                    //console.log('Draw ' + stopGraphicType + ' ' + JSON.stringify(StopObj));
                    //var originMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-green.svg', 24, 24);
                    var originMarker = new PictureMarkerSymbol('/img/svg/map-icons/circle-gray-outline-green.svg', 24, 24);
                    //var destinationMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-red.svg', 24, 24);
                    var destinationMarker = new PictureMarkerSymbol('/img/svg/map-icons/circle-gray-outline-red.svg', 24, 24);
                    //var transferMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-gray.svg', 14, 14);
                    var transferMarker = new PictureMarkerSymbol('/img/svg/map-icons/circle-gray-outline-white.svg', 20, 20);
                    var ptlatlon = new Array(2);
                    CoordinateConversion.UTMXYToLatLon(parseFloat(StopObj.StopLocation.Y), parseFloat(StopObj.StopLocation.X), 15, false, ptlatlon);
                    var longitude = CoordinateConversion.RadToDeg(ptlatlon[1]);
                    var latitude = CoordinateConversion.RadToDeg(ptlatlon[0]);
                    var thePoint = new Point(longitude, latitude);
                    var attr = { "StopID": StopObj.StopID, "LocationName": StopObj.StopLocation.LocationName };
                    var stopGraphic;
                    if (stopGraphicType === "Board") {
                        stopGraphic = new Graphic(thePoint, originMarker, attr);
                    } else if (stopGraphicType === "Exit") {
                        stopGraphic = new Graphic(thePoint, destinationMarker, attr);
                    } else if (stopGraphicType === "Transfer") {
                        stopGraphic = new Graphic(thePoint, transferMarker, attr);
                    }
                    MAP.getLayer("tripStop").add(stopGraphic);
                };


                if (MAP.infoWindow.isShowing) {
                    MAP.infoWindow.hide();
                }
                //console.dir(tripPlan);
                MAP.getLayer("trip").clear();
                MAP.getLayer("tripStop").clear();
                //
                // Test if there's a plan available to show
                //
                var tripsAvailable = tripPlan.PlannerItin.PlannerOptions.length;
                if (tripToDraw >= tripsAvailable) {
                    console.warn("Requested trip not available in current trip plan");
                    return;
                }
                var segs = tripPlan.PlannerItin.PlannerOptions[tripToDraw].Segments;
                var segExt;
                var tripExt;
                //The first non-walking segment should have a board symbol.
                //The last non-walking segment should have an exit symbol
                //Interior non-walking segments should have transfer symbols
                var firstSeg = 0;
                var lastSeg = segs.length - 1;
                var routesInSegments = [];
                for (let i = 0, sl = segs.length; i < sl; i++) {
                    var seg = segs[i];
                    //console.log("Doing Segment " + seg.SegmentNumber + " index " + i + " Type " + seg.SegmentType);
                    if (seg.Geometry) {
                        var cls1, attr;
                        try {
                            if (seg.SegmentNumber !== firstSeg) {
                                drawTripStop(seg.OnStop, "Transfer");
                            }
                            if (seg.SegmentNumber !== lastSeg) {
                                drawTripStop(seg.OffStop, "Transfer");
                            }
                        }
                        catch (err) {
                            console.debug("Error identifying trip end stops ;Probably a walk segment");
                        }
                        var rtColor;
                        switch (seg.SegmentType) {
                            case 0:  //Bus
                                var lnWidth;
                                if (seg.Route === "903") {//is Red Line
                                    rtColor = new Color([237, 27, 46]);
                                    lnWidth = 10;
                                } else
                                    if (seg.Route === "904") { // is orange line
                                        rtColor = new Color([255, 153, 0]);
                                    } else {
                                        rtColor = new Color([0, 173, 239, .72]);   // default CYAN 
                                        lnWidth = 8;
                                    }
                                cls1 = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, rtColor, lnWidth, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_ROUND);
                                infoTemplate = new InfoTemplate("Title", "Content");
                                attr = {};
                                break;
                            case 1:  //Light Rail
                                if (seg.Route === "901") { //is Blue Line
                                    rtColor = new Color([0, 83, 160]);
                                } else if (seg.Route === "902") { //is Green Line
                                    rtColor = new Color([0, 129, 68]);
                                } else {
                                    rtColor = new Color([0, 173, 239, .72]);   // default CYAN 
                                    lnWidth = 8;
                                }
                                cls1 = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, rtColor, 10, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_ROUND);
                                infoTemplate = new InfoTemplate("Title", "Content");
                                attr = {};
                                break;
                            case 2: // NorthStar Train  BROWN LINE
                                cls1 = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, new Color([119, 29, 29]), 8, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_ROUND);
                                infoTemplate = new InfoTemplate("Title", "Content");
                                attr = {};
                                break;
                            case 3: //Walk  DASHED LINE
                                cls1 = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SHORTDOT, new Color([0, 180, 210, .77]), 8, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_ROUND);
                                infoTemplate = new InfoTemplate("Title", "Content");
                                attr = {};
                                break;
                            default:
                                cls1 = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SHORTDOT, new Color([255, 34, 204]), 8, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_ROUND);
                                infoTemplate = new InfoTemplate("Title", "Content");
                                attr = {};
                                break;
                        }
                        if (seg.Route) {
                            routesInSegments.push(seg.Route);
                        }
                        var theTripLine = new Polyline(MAP.spatialReference);
                        var newPoints = [];
                        for (var j = 0, jl = seg.Geometry.length; j < jl; j++) {
                            var point = seg.Geometry[j];
                            var newp = point.split(",");
                            newp.reverse();
                            var ptlatlon = [];
                            CoordinateConversion.UTMXYToLatLon(parseFloat(newp[0]), parseFloat(newp[1]), 15, false, ptlatlon);
                            var longitude = CoordinateConversion.RadToDeg(ptlatlon[1]);
                            var latitude = CoordinateConversion.RadToDeg(ptlatlon[0]);
                            var WebMercXY = webMercatorUtils.lngLatToXY(longitude, latitude);
                            newPoints.push(WebMercXY);
                        }
                        theTripLine.addPath(newPoints);
                        graphic = new Graphic(theTripLine, cls1, attr, null);
                        MAP.getLayer("trip").add(graphic);
                        segExt = new Extent({ "xmin": graphic.geometry.getExtent().xmin, "ymin": graphic.geometry.getExtent().ymin, "xmax": graphic.geometry.getExtent().xmax, "ymax": graphic.geometry.getExtent().ymax, "spatialReference": { "wkid": 3857 } });
                        if (tripExt) {
                            if (segExt.xmin < tripExt.xmin) { tripExt.xmin = segExt.xmin; }
                            if (segExt.ymin < tripExt.ymin) { tripExt.ymin = segExt.ymin; }
                            if (segExt.xmax > tripExt.xmax) { tripExt.xmax = segExt.xmax; }
                            if (segExt.ymax > tripExt.ymax) { tripExt.ymax = segExt.ymax; }
                        } else {
                            tripExt = segExt;
                        }
                    }
                }

                // This is either draw the routes and stops for the segments OR if no segment routes, it will clear the layer
                // drawRoutes(routesInSegments);
                // drawRouteStops(routesInSegments);

                var tripOrigin = { StopID: "Origin", StopLocation: { LocationName: tripPlan.FromAddress.Location.LocationName, X: tripPlan.FromAddress.Location.X, Y: tripPlan.FromAddress.Location.Y } };
                drawTripStop(tripOrigin, "Board");
                var tripDest = { StopID: "Destination", StopLocation: { LocationName: tripPlan.ToAddress.Location.LocationName, X: tripPlan.ToAddress.Location.X, Y: tripPlan.ToAddress.Location.Y } };
                drawTripStop(tripDest, "Exit");

                if (zoomToTripExtent) {
                    MAP.setExtent(tripExt, true);
                } else {
                    geoLocate();
                }
            });
    };

    function formatPopupDepartures(/*string*/stop) {
        $('#mapPopUpDepartures').empty();
        $.get('https://svc.metrotransit.org/nextripv2/' + stop)
        .done(function (result) {
            if (result.Departures.length > 0) {
                let departures = result.Departures.sort(function (a, b) {
                    a = new Date(a.DepartureTime);
                    b = new Date(b.DepartureTime);
                    return a < b ? -1 : a > b ? 1 : 0;
                });

                for (let i=0,l=departures.length; i < l; i++) {
                    let depart = departures[i];
                    var departRow = $('<div/>', { class: 'list-group-item' });
                    departRow.append($('<span/>', { class: 'route-number mr-2' }).text(depart.RouteId + depart.Terminal));
                    departRow.append($('<span/>', { class: 'route-name' }).text(depart.Description));
        
                    var departTime = $('<span/>', { class: 'depart-time ml-auto' });
                    if (depart.Actual === true) {
                        departTime.append($('<img/>', { class: 'icon blink mr-1', src: '/img/svg/broadcast-red.svg' }));
                    }
                    departTime.append(depart.DepartureText);
                    departTime.appendTo(departRow);
                    departRow.appendTo($('#mapPopUpDepartures'));
                }
            } else {
                $('#mapPopUpDepartures').html('<span style="font-size:larger">No departures available at this time</span>');
            }
        })
        .fail(function () {
            console.warn("Nextrip failed for stop " + stop);
        });
    }

    //@@@@@@@@@@@@@@@@@@@@
    //@@@  I N I T @@@@@@@
    //@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@
    var init = function (mapElementID) {
        var nexTrip_INTERVAL = null;
        
        return $.Deferred(function (dfd) {
            // mapType property on the <div>
            var pType = document.getElementById(mapElementID).getAttribute("maptype");
            var mapType = pType !== null ? pType : "full";
            //console.log(mapElementID + " functionality is " + mapType);

            var ROUTENAMES = null;
            $.ajax({
                type: "get",
                url: "https://svc.metrotransit.org/nextripv2/routes",
                dataType: "json"
            })
                .done(function (result, status, xhr) {
                    ROUTENAMES = {};
                    // Input format: { RouteId: "901", ProviderID: "8", Description: "METRO Blue Line", RouteAbbr: ... }
                    // Outformat { "901": "METRO Blue Line" }
                    for (let i = 0, l = result.length; i < l; i++) {
                        var route = result[i];
                        ROUTENAMES[route.RouteId] = route.Description;
                    }
                    //console.dir(ROUTENAMES);
                })
                .fail(function (err) {
                    console.warn("NexTrip Routes fetch failed" + err);
                });

            require(["esri/map",
                "esri/basemaps",
                "esri/config",
                "esri/graphic",
                "esri/Color",
                "esri/SpatialReference",
                "esri/geometry/Extent",
                "esri/geometry/Point",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "esri/layers/GraphicsLayer",
                "esri/tasks/query",
                "esri/tasks/QueryTask",
                "esri/symbols/PictureMarkerSymbol",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/dijit/Scalebar",
                "esri/dijit/Popup",
                "esri/dijit/LocateButton",
                "dojo/on",
                "dojo/domReady!"
            ], function (
                Map,
                esriBasemaps,
                esriConfig,
                Graphic,
                Color,
                SpatialReference,
                Extent,
                Point,
                ArcGISDynamicMapServiceLayer,
                GraphicsLayer,
                Query,
                QueryTask,
                PictureMarkerSymbol,
                SimpleMarkerSymbol,
                Scalebar,
                Popup,
                LocateButton,
                on
            ) {
                    var drawNiceRides = function () {
                        $.ajax({
                            type: "get",
                            url: "https://gbfs.niceridemn.com/gbfs/en/station_information.json",
                            dataType: "json"
                        })
                            .done(function (result, status, xhr) {
                                var stations = result.data.stations;
                                if (stations) {
                                    var layer = MAP.getLayer("niceRides");
                                    for (var i = 0, sl = stations.length; i < sl; i++) {
                                        var station = stations[i];
                                        var thePoint = new Point(station.lon, station.lat);
                                        var theMarker = new PictureMarkerSymbol('/img/svg/map-icons/NiceRideGreen.svg', 30, 23);
                                        var attr = { "id": station.station_id, "name": station.name, "capacity": station.capacity };
                                        var g = new Graphic(thePoint, theMarker, attr);
                                        layer.add(g);
                                    }
                                }
                            })
                            .fail(function (err) {
                                console.warn("NiceRide Station fetch failed" + err);
                            });
                    };
                    var formatRouteList = function (/*string*/routeList) {
                        var routestring = '';
                        var workArray = routeList.split(" ");
                        if (workArray.length > 0) {
                            for (let i = 0, l = workArray.length; i < l; i++) {
                                workArray[i] = parseInt(workArray[i]); // convert string to integers to sort them correctly
                            }
                            var rtList = _bubbleSort(workArray);
                            for (i = 0, len = rtList.length; i < len; i++) {
                                if (i > 0) { routestring += '<br/>'; }
                                var rt = rtList[i];
                                var rtName = '';
                                if (ROUTENAMES) rtName = ROUTENAMES[rt];
                                var html = '<input id="cb' + rt + '"';
                                html += 'dojotype="dijit.form.RadioButton"';
                                html += 'onclick="javascript:TRIM.drawRoutes([' + rt + ']);TRIM.drawRouteStops(['+ rt + ']);return true;"';
                                html += 'name="optRoute" type="radio" />';
                                html += '<label for="cb' + rt + '">' + rtName + '</label>';
                                routestring += html;
                            }
                        } else {
                            routestring = '<span style="font-size:larger">No routes service this stop.</span>';
                        }
                        //console.log(routestring);
                        return routestring;
                    };
                    var idMap = function (evt) {
                        clearInterval(nexTrip_INTERVAL);
                        var showLocation = function (results2) {
                            var title = "Map Click<hr/>" + "Location found: <br/>" + results2.address.address.Street + "<br/>";

                            //$(".esriPopupMobile .sizer").css("height", "90px");
                            //$(".esriPopupMobile .titlePane").css("height", "90px");
                            MAP.infoWindow.setTitle(title);

                            var rsltScrPnt = MAP.toScreen(results2.address.location);
                            var num = MAP.height / 2;
                            var infoWindowOrigin;
                            var toppx = 0;
                            if (MAP.height / 2 < rsltScrPnt.y) {
                                //if click in the bottom half of the screen, change the click point by 50 pixels.
                                var curPoint = MAP.toScreen(results2.address.location);

                                curPoint.y = curPoint.y - 50;
                                infoWindowOrigin = curPoint;
                                //console.log("Click Y after adjustment1: " + curPoint.y);
                                if (curPoint.y + 50 > MAP.height / 2 && MAP.height / 2 > curPoint.y) {
                                    //console.log("clicked in bottom half of map window, but adjustment moves it to top half");
                                    //css top is supposed to be 104 pixels above (negative actually so less than, numerically) the map click, we're making the popup 50 pixels wider
                                    toppx = curPoint.y - 54;
                                    curPoint.y = curPoint.y + 50;
                                    infoWindowOrigin = curPoint;
                                }
                            } else {
                                infoWindowOrigin = MAP.toScreen(results2.address.location);
                            }
                            MAP.infoWindow.show(MAP.toMap(infoWindowOrigin));
                            //if (toppx > 0) {
                            //    $(".esriPopupMobile").css("top", toppx + "px");
                            ///}
                        };
                        var query = new Query();
                        var queryTask = new QueryTask("https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/1");
                        var pixelWidth = MAP.extent.getWidth() / MAP.width;
                        var toleraceInMapCoords = 20 * pixelWidth;
                        query.returnGeometry = true;
                        query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                        query.where = "NROUTES <> 0";
                        query.outFields = ["SITEID", "SITE_ON", "SITE_AT", "ROUTES", "SYMBOL", "NROUTES"];
                        query.geometry = new Extent(evt.mapPoint.x - toleraceInMapCoords, evt.mapPoint.y - toleraceInMapCoords,
                            evt.mapPoint.x + toleraceInMapCoords,
                            evt.mapPoint.y + toleraceInMapCoords,
                            MAP.spatialReference);

                        MAP.infoWindow.hide();
                        MAP.getLayer("stops").clear();
                        queryTask.execute(query);
                        queryTask.on("error", function (err) {
                            console.warn("Bus Stop Query Error: " + err);
                        });
                        queryTask.on("complete", function (fSet) {
                            
                            if (fSet.featureSet.features.length === 0) {
                                //if there are no features, do a generic reverse geocode.
                                //locateAddress();
                            }
                            else {
                                //console.log("Bus Stop Query Complete. There are " + fSet.featureSet.features.length + " features");                  
                                var feature = fSet.featureSet.features[0];

                                var atts = feature.attributes;
                                MAP.infoWindow.setTitle("Stop Number: " + atts.siteid);
                                MAP.infoWindow.setContent($('#trimPopUp')[0]);
                                $('#trimPopUp').show();
                                MAP.infoWindow.show(evt.screenPoint, MAP.getInfoWindowAnchor(evt.screenPoint));

                                var stopGraphic = new Graphic();
                                var stopSymbol;
                                stopGraphic.setGeometry(feature.geometry);
                                if (atts.Symbol === 0) {
                                    stopSymbol = new PictureMarkerSymbol('/img/svg/map-icons/badge-blue-bus.svg', 25, 25);
                                } else if (atts.Symbol === 1) {
                                    stopSymbol = new PictureMarkerSymbol('/img/svg/map-icons/badge-blue-lrt.svg', 24, 24);
                                } else if (atts.Symbol === 2) {
                                    stopSymbol = new PictureMarkerSymbol('/img/svg/map-icons/badge-blue-train.svg', 24, 24);
                                }
                                stopGraphic.setSymbol(stopSymbol);
                                MAP.getLayer("stops").add(stopGraphic);
                                let stopName = atts.site_on.trim();
                                stopName += atts.site_at.trim() !== 'null' ? ' & ' + atts.site_at.trim() : '';
                                $('#mapPopUpStopDescription').html(stopName);
                                $('#mapPopUpRoutes').html(formatRouteList(atts.ROUTES));

                                formatPopupDepartures(atts.siteid);
                                nexTrip_INTERVAL = setInterval(function() {
                                    formatPopupDepartures(atts.siteid);
                                }, 30000);
                            }
                        });
                    };
                    //===================================================================================
                    //  START OF MAP INITIALIZATION =====================================================
                    //===================================================================================

                    //esriConfig.defaults.map.panRate = 1;
                    //esriConfig.defaults.map.panDuration = 1;
                    var spatialRefWM = new SpatialReference({ wkid: 3857 });
                    initExtent = new Extent({ "xmin": -10385405, "ymin": 5615111, "xmax": -10379460, "ymax": 5619877, "spatialReference": spatialRefWM });
                    //try {
                    //console.log("Cookie: " + cookie("map.Extent"));
                    //var extObj = dojo.fromJson(cookie("map.Extent"));
                    //var cookieExtent = new Extent(extObj);
                    //}
                    //catch (e) {
                    //    console.warn(e);
                    //}
                    var popUpDiv = document.createElement("div");
                    var mapPopup = new Popup(
                       {
                           zoomFactor: 4,
                           marginLeft: 20, //if maxed
                           marginRight: 20, //if maxed
                           anchor: "auto",
                           pagingControls: false,
                           pagingInfo: false,
                           markerSymbol: new SimpleMarkerSymbol(
                               "circle",
                               32,
                               null,
                               new Color([0, 0, 0, 0.25])
                           ),
                           highlight: true
                       },
                       popUpDiv
                    );
                    mapPopup.startup();

                    esriBasemaps.metCouncilWebMercator = {
                        baseMapLayers: [{ url: "https://arcgis.metc.state.mn.us/arcgis/rest/services/BaseLayer/BasemapWM/MapServer" }],
                        title: "MetCouncil"
                    };
                    esriBasemaps.transitVector = {
                        title: "TransitVector",
                        // First version of the basemap with some extra parking lots and labels
                        //baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/8cbdf505cd3f4dc39c4e5da6f5b49d95/resources/styles/root.json", type: "VectorTile" }]
                        //baseMapLayers: [{url:"/js/basemapStylev1.json", type: "VectorTile"}]                    };
                        // 2nd version of the basemap 
                        //baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/5c2ea8c24d7a46ed8c61cd058219504f/resources/styles/root.json", type: "VectorTile" }]
                        baseMapLayers: [{ url: "/js/basemapStylev2.json", type: "VectorTile" }]
                    };

                    MAP = new Map(mapElementID, {
                        autoResize: true,
                        logo: false,
                        showAttribution: true,
                        //infoWindow: popup,
                        infoWindow: mapPopup,
                        sliderPosition: "bottom-right",
                        basemap: "transitVector",
                        maxZoom: 18,
                        minZoom: 9,
                        center: [-93.27, 44.975],
                        //fadeOnZoom: true,
                        zoom: 14
                    });

                    MAP.on("load", function () {

                        GEOLOCATE = new LocateButton({
                            map: MAP,
                            scale: 10000
                        }, 'trimLocate');
                        GEOLOCATE.startup();
                        GEOLOCATE.on("locate", function (result) {
                            on.once(MAP, "click", function () {
                                GEOLOCATE.clear();
                            });
                        });
                        var scalebar = new Scalebar({
                            map: MAP,
                            attachTo: "bottom-left",
                            scalebarUnit: "english"
                        });

                        if (mapType === 'route') {
                            // disallow naviagation and zoom, remove buttons
                            MAP.disablePan();
                            MAP.disableMapNavigation();
                            MAP.disableDoubleClickZoom();
                            MAP.hideZoomSlider();
                            $("#trimLocate").hide();
                        }
                    });

                    MAP.on("click", function (evt) {
                        if (mapType === "full") {
                            if (MAP.infoWindow.isShowing) {
                                MAP.infoWindow.hide();
                            }
                            idMap(evt);
                        }
                    });

                    MAP.on("resize", function (extent, width, height) { });

                    MAP.on("update-start", function () {
                        $(".mapLoading").show();
                    });
                    MAP.on("update-end", function (err) {
                        $(".mapLoading").hide();
                    });

                    MAP.on("layers-add-result", function (result) {
                        if (mapType === 'full') {
                            drawNiceRides();
                        }
                        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                        dfd.resolve();
                        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    });
                    MAP.on("layer-add-result", function (result) {
                        if (result.error) {
                            console.error("Layer add " + result.error + " for " + result.layer.url);
                        }
                    });
                    const TRIM_MapServer = "https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer";

                    var allStopLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                        {
                            id: "allStops",
                            opacity: 0.6
                        });
                    allStopLayer.setImageFormat("svg");
                    allStopLayer.setVisibleLayers([1]);

                    var goToLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                        {
                            id: "goTo",
                            opacity: 1,
                            visible: true
                        });
                    goToLayer.setImageFormat("svg");
                    goToLayer.setVisibleLayers([2]);

                    var parkAndRidesLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                        {
                            id: "parkAndRides",
                            opacity: 1,
                            visible: true
                        });
                    parkAndRidesLayer.setImageFormat("svg");
                    parkAndRidesLayer.setVisibleLayers([8]);

                    //var allRoutesLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                    //    {
                    //        id: "allRoutes",
                    //        opacity: 0.35
                    //    });
                    //allRoutesLayer.setImageFormat("svg");
                    //allRoutesLayer.setVisibleLayers([5]);

                    var routestopLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                        {
                            id: "routeStops",
                            opacity: 1
                        });
                    routestopLayer.setImageFormat("svg");
                    routestopLayer.setVisibleLayers([0]);
                    routestopLayer.setLayerDefinitions(["1=0"]);

                    var routesLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
                        {
                            id: "routes",
                            opacity: 0.7

                        });
                    routesLayer.setImageFormat("svg");
                    routesLayer.setVisibleLayers([4]);
                    var layerQuerySettings = [];
                    layerQuerySettings[4] = "1=0"; // query for sublayer 4 - show nothing
                    routesLayer.setLayerDefinitions(layerQuerySettings);

                    var tripLayer = new GraphicsLayer({
                        id: "trip",
                        opacity: 0.75
                    });

                    // this holds the trip stops for the trip map
                    var tripStopLayer = new GraphicsLayer({
                        id: "tripStop"
                    });

                    // this holds the bus stop highlight graphic for the full map
                    var stopsLayer = new GraphicsLayer({
                        id: "stops"
                    });

                    // this holds the NiceRide station locations
                    var niceRidesLayer = new GraphicsLayer({
                        id: "niceRides",
                        opacity: 0.75,
                        visible: false,
                        maxScale: 1200,
                        minScale: 25000
                    });

                    var mapLayers = [];
                    if (mapType === "full") {
                        mapLayers = [
                            //allRoutesLayer,
                            allStopLayer,
                            goToLayer,
                            parkAndRidesLayer,
                            routesLayer,
                            routestopLayer,
                            stopsLayer,
                            niceRidesLayer
                        ];
                    } else if (mapType === "route") {
                        mapLayers = [
                            routesLayer,
                            routestopLayer
                        ];
                    } else if (mapType === "trip") {
                        mapLayers = [
                            //allRoutesLayer,
                            allStopLayer,
                            tripLayer,
                            tripStopLayer,
                            routesLayer,
                            routestopLayer,
                            stopsLayer
                        ];
                    }
                    MAP.addLayers(mapLayers);
                }
            );
        }).promise();
    };
    var findStop = function (stopID) {
        var queryWhere = "siteid = " + stopID;
        return $.Deferred(function (dfd) {
            $.ajax({
                type: "get",
                url: "https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/1/query",
                data: {
                    where: queryWhere
                    , returnGeometry: true
                    , outFields: "site_on, site_at, ROUTES, ROUTEDIRS"
                    , outSR: 4326
                    , f: "json"
                },
                dataType: "json"
            })
                .done(function (r) {
                    if (r.error) {
                        console.warn("Stop lookup failed");
                        dfd.reject();
                    } else {
                        // convert the WM X, Y to Lat/Lng
                        if (r.features.length > 0) {
                            var feature = r.features[0];
                            let x = feature.geometry.x;
                            let y = feature.geometry.y;
                            let name = feature.attributes.site_on.trim();
                            name += feature.attributes.site_at.trim() !== 'null' ? ' & ' + feature.attributes.site_at.trim() : '';
                            dfd.resolve(x, y, name);
                        }
                        else {
                            console.warn("stops query returned no results: " + stopID);
                            dfd.reject();
                        }
                    }
                })
                .fail(function () {
                    console.warn("Stop service failed");
                    dfd.reject();
                });
        }).promise();
    };
    // ---------------------------------------------------------------
    // This runs from iMap/InteractiveMap.aspx
    // and uses this routing: "/imap/<route>/<stop>"
    // where <route> is required and a valid transit route number or zero
    // and <stop> is optional and is a valid stop number
    // Page will open and show the interactive map. If route provided,
    // the route line will draw and route stops will be highlighted.
    // If the stop provided, the map will mark the stop and zoom there.
    //
    // This page also directly as iMap/InteractiveMap.aspx?x=<longitude>&y=<latitude>
    // to open the map as a particular point.
    // ----------------------------------------------------------------
    var fullPageSetup = function (mapDiv, route, stop, x, y) {
        var h = $(window).height();
        if (h > 1000) {
            $('.map').css({ 'height': h - 500 });
        } else if (h > 500) {
            $('.map').css({ 'height': h - 220 });
        }
        init(mapDiv).then(function () {
            if (route) {
                if (stop) {
                    drawRoutes([route], /*zoomToRoute*/false);
                    drawRouteStops([route]);
                    findStop(stop)
                        .then(function (x, y, name) {
                            let title = 'Stop ' + stop + ' / ' + name;
                            $('#page-title-text').html(title);
                            centerMarkerAtPoint(x, y,/*zoomLevel*/ 19);
                        }).fail(function () {
                            console.warn('Requested stop ' + stop + ' not found.');
                        });
                } else {
                    drawRoutes([route], /*zoomToRoute*/true);
                    drawRouteStops([route]);
                }
                toggleLayer('parkAndRides'); // Turn the P&R Layer off for the route link page
            } else {
                if (stop) {
                    findStop(stop)
                        .then(function (x, y, name) {
                            let title = 'Stop ' + stop + ' / ' + name;
                            $('#page-title-text').html(title);
                            centerMarkerAtPoint(x, y,/*zoomLevel*/ 17);
                        }).fail(function () {
                            console.warn('Requested stop ' + stop + ' not found.');
                        });
                    toggleLayer('parkAndRides'); // Turn the P&R Layer off for the route link page
                } else {
                    if (x && y) {
                        //console.log("Coordinates: " + x + ", " + y);
                        centerMarkerAtPoint(parseFloat(x), parseFloat(y),14);
                    }
                }
            }
        });
    };
    var mapDestroy = function() {
        GEOLOCATE.destroy();
        GEOLOCATE = null;
        MAP.destroy();
        MAP = null;
    };
    return {
        fullPageSetup: fullPageSetup,
        centerMarkerAtPoint: centerMarkerAtPoint,
        drawTrip: drawTrip,
        drawRouteStops: drawRouteStops,
        drawRoutes: drawRoutes,
        geoLocate: geoLocate,
        toggleLayer: toggleLayer,
        destroy: mapDestroy,
        init: init
    };
})(jQuery, window, document);

var BOM = (function ($, window, document, undefined) {
	/*
	 * Buses On Map (BOM)
	 * 
	 * Assumes: 
     * Code Dependencies:
     *  jquery191/jquery.min.js
     *  ArcGIS Javascript API 3.28
     *  CoordinateConversion.js
     * 
     * Invoked from two separate javascript set-up scripts that establish the map
     * and all the layers passing them into this script during BOM_init.
     * Several Global variables are also declared from the set-up scripts to 
     * establish the time-outs values for pausing and restarting the 
     * bus location service.
	 * 
	 * Fixes: 
	 * - add 'cache:false' to AJAX call for bus locations Feb, 2018
     * 
     * Updates:
     * - Dec 2018 Remove bus direction filter - show buses going in either direction
     * - Mar 2019 Remove draw of route 906 airport shuttle, show only blue line
     *            Disable continuous zoom - zoom once then quit
     *            When service times out, tapping the map restarts it
     *            Fetch routes individually, one call per route
     *            Timeout the service after 40 cycles
     *            Find Me will zoom out once to show nearest bus
     * - Apr 2019 Add new NexTripSignMap.js 
     * - July 2019 Redeisgn conversion to SVG services and refactoring
	 * 
	 */
    // Initialize variables used throughout BOM routines
    'use strict';

    var _MAP; // the map passed from NexTripMap.js
    var _CURRENTLOD = null;
    var _SHOWALLBUSES = false;
    var _ROUTEID = null; // these are requested routes from the URL parameter
    var _ROUTESFORSHOW = null; // these are route number only for the requested stop
    var _ROUTESFORSTOP = null; // these have route number plus terminal letter for the requested stop
    var _LOCATION_SERVICE = "https://svc.metrotransit.org/nextripv2/vehicles/";
    var _STOPS_QUERY_LAYER = "https://arcgis.metc.state.mn.us/transit/rest/services/transit/BOM_Points/MapServer/0";
    var _ROUTE_SERVICE = "https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer";
    var _ROUTE_LAYER = 4; // service layer ID for TRIM routes
    var _BOMRUNNING = true; // service actively cycling
    var _TIMEINTERVAL = 7500; // milliseconds between cycles requesting bus locations
    var _TIMECLOCK = null; // a holder for 'setInterval' value
    var _TICKS = 0; // a count of every iteration of the update cycle
    var _TICKSTOP = 60; // after this many cycles pause the service
    var _RESTARTACTIONVERB = 'Click or tap';
    var _GEOLOCATE; // this is the locate button object
    var _DEBUG = false;

    var geoLocate = function () {
        _GEOLOCATE.locate();
    };
    var BOMStatus = function () {
        return _BOMRUNNING;
    };
    var setTimeInterval = function (newInterval) {
        _TIMEINTERVAL = newInterval;
    };
    var setTickStop = function (/*integer*/newTickStop) {
        if (newTickStop === 0) {
            _TICKSTOP = null;
        } else {
            _TICKSTOP = newTickStop;
        }
    };
    var clearMarkerAtPoint = function () {
        _MAP.getLayer("Markers").clear();
    };
    var drawMarkerAtPoint = function (/*Point*/p) {
        _MAP.getLayer("Markers").clear();
        require([
            "esri/graphic",
            "esri/Color",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/SimpleLineSymbol"
        ], function (Graphic, Color, PictureMarkerSymbol, SimpleMarkerSymbol, SimpleLineSymbol
        ) {
                var g = new Graphic();
                g.setGeometry(p);
                //var under = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 20, 
                //    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 2),
                //    new Color([0, 122, 194, 1]));
                //under.setOffset(0, 16);
                //g.setSymbol(under);

                //var stopSymbol = new PictureMarkerSymbol('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjBBNTJGNjgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjk3MjdFNDgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCMEE1MkY0ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCMEE1MkY1ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Mp+ygwAAA2VJREFUeNqsVs9PU0EQ3vejVLEoUhAQUOMFCIn1YVJ6MHLzRk3gbEpMkIjGu/8Fh1ZN0JrGM2n0wMGjF8REbKuJ8WJEQ4vFKAGFltI+Z5rZZljfg4JO8uX1bd/ut7M7881owt00lyf/bbMxm73bboua+xBJ6Oy3SqiiomxiT0K+qM5gKO98wQqhTE+Nno7emg5kGiMxFRjMW8HIdhSU2QZ2kZoOZAbBA2hQwEltRlYCbDOUmCO7SNUjlZ7h4l7AEcBRenojkUjP2NjYYHt7ewd+nM/nc8lk8k08Hv8CrwUFwo1UHqFJCx8HnAKcAwwAgtPT03ez2exioVCwEa8//6hCvudyucVoNHobvrUAvYBugB/go40b8hrUO2sg0kZAE2J+fn7Ssqzxl0sbIvpqRTz/+HPX1sO9J8WdUIe4crZJZDKZeDAYvA/Dvwhb5G2J7tTWWOSZCtkJILuFZBPPPomn6e9iL7seaBUz186LdDodHxoaisHQOpFu0r1Wg8lggWKS+3hnPjjGyyMjI/fqIUPLfNsUS2tFMTHcb3V2dmbm5uayLFplxNqcDI/zGN1hM9zZw/cbHutq4oM4iL2I9IsB33aqq6vrJryukac1L3WWFrXcw2hsaWmx8M4OajjH7/dfHB8f7yEnPCxoNF1JiSophj4OqAFSj8k5o6Ojl5S81YWLRuqYZ5mVTXFYw7ltbW2nneRQd/jeFv/fbE6oKn0FFeRCR+OhV8e5q6urWaa1tdKlO6j+DsqVTOqDmpwzOzu7yIS8wmXNYCojk74Z5Grm3br5L2kxqaRFUaaFdLdMO8J8KcAOH6NcoYLUa/gtzoETekSSVlS9NJTyVIsqUIp8OBz2TAz3WaggqCT1SFsqlXoCKZGEod/Ms5K8MrUOekjeGknpfQsLC1OBQOBGPeKNZKFQ6AEMbzAdLTLxrvBqbxCZj0pLN5WawVgsNrW8vPzWrTzhf1SeMNn7AGcArRQPXt4paA5Hyj2VBbhahFGuUEEoqauhj9GYSCS+0p1tsZIkPdvhqaE59DS6Q4vhVdoMnVVy2WIUCbLF4MdYcWoxbKUdUBc0mRBzwjJrnkpKI2WryqW59KWqtzrLV11RKN4mltlvx8ZYq6Pr1h2ewqERrrg0xmI/D/frwt3E2XZo/f+yPwIMACLRpTLsc+73AAAAAElFTkSuQmCC', 30, 30);
                // MyGPS_location.png the blue dot
                var stopSymbol = new PictureMarkerSymbol('/img/svg/map-icons/pin-red.svg', 20, 24);
                stopSymbol.setOffset(0, 10);
                g.setSymbol(stopSymbol);
                _MAP.getLayer("Markers").add(g);
            });
    };
    var drawVehicleOnMap = function (/*Point*/point, /*string*/route, /*string*/term, /*int*/direction, /*string*/lastUpdate, /*int*/BusID) {
        require([
            "esri/graphic",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/TextSymbol",
            "esri/symbols/Font",
            "esri/Color"
        ], function (Graphic, PictureMarkerSymbol, TextSymbol, Font, Color) {
            if (point) {
                // Compute the last elapsed seconds since last update
                //var elapsedSec = timeElapsedInSeconds(lastUpdate);
                //var flagIt = elapsedSec > 180 ? true : false;
                //if (flagIt) {
                //	//console.log(BusID + " " + route + term + ":" + elapsedSec + " " + (flagIt ? "flagged" : ""));
                //}
                // DEFAULT - use a Picturesymbol depending on direction
                var g = new Graphic();
                g.setGeometry(point);
                //var symbol = new PictureMarkerSymbol("../img/svg/map-icons/direction-up.svg", 34, 40);
                var symbol = new PictureMarkerSymbol("data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiA0NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzFmMjA7fS5jbHMtMntmaWxsOiNmZmYxMDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2NhdG9yX25vcnRoPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMCwwSDZBNiw2LDAsMCwwLDAsNlYzMGE2LDYsMCwwLDAsNiw2SDEzLjVMMTgsNDVsNC41LTlIMzBhNiw2LDAsMCwwLDYtNlY2QTYsNiwwLDAsMCwzMCwwWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyNCAyNSAxOCAxNyAxMiAyNSAyNCAyNSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMyAyNy41IDIzIDI3LjUgMTggMzQuMTcgMTMgMjcuNSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIyLDI4bC00LDUuMzNMMTQsMjhoOG0yLTFIMTJsNiw4LDYtOGgwWiIvPjwvc3ZnPg==", 32, 40);
                if (direction === 3) { // WEST 
                    //symbol = new PictureMarkerSymbol("../img/svg/map-icons/direction-left.svg", 34, 40);
                    symbol = new PictureMarkerSymbol("data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiA0NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzFmMjA7fS5jbHMtMntmaWxsOiNmZmYxMDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2NhdG9yX3dlc3Q8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMwLDBINkE2LDYsMCwwLDAsMCw2VjMwYTYsNiwwLDAsMCw2LDZIMTMuNUwxOCw0NWw0LjUtOUgzMGE2LDYsMCwwLDAsNi02VjZBNiw2LDAsMCwwLDMwLDBaIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjE3IDIwIDkgMjYgMTcgMzIgMTcgMjAiLz48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTkuNSAyMSAyNi4xNyAyNiAxOS41IDMxIDE5LjUgMjEiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yMCwyMmw1LjMzLDRMMjAsMzBWMjJtLTEtMlYzMmw4LTYtOC02aDBaIi8+PC9zdmc+", 32, 40);
                } else
                    if (direction === 2) { // EAST
                        //symbol = new PictureMarkerSymbol("../img/svg/map-icons/direction-right.svg", 34, 40);
                        symbol = new PictureMarkerSymbol('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiA0NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzFmMjA7fS5jbHMtMntmaWxsOiNmZmYxMDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2NhdG9yX2Vhc3Q8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMwLDBINkE2LDYsMCwwLDAsMCw2VjMwYTYsNiwwLDAsMCw2LDZIMTMuNUwxOCw0NWw0LjUtOUgzMGE2LDYsMCwwLDAsNi02VjZBNiw2LDAsMCwwLDMwLDBaIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjE5IDMyIDI3IDI2IDE5IDIwIDE5IDMyIi8+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjkuODMgMjYgMTYuNSAyMSAxNi41IDMxIDkuODMgMjYiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNiwyMnY4bC01LjMzLTRMMTYsMjJtMS0yTDksMjZsOCw2VjIwaDBaIi8+PC9zdmc+', 32, 40);
                    } else
                        if (direction === 1) { // SOUTH
                            //symbol = new PictureMarkerSymbol("../img/svg/map-icons/direction-down.svg", 34, 40);
                            symbol = new PictureMarkerSymbol("data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiA0NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzFmMjA7fS5jbHMtMntmaWxsOiNmZmYxMDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2NhdG9yX3NvdXRoPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMCwwSDZBNiw2LDAsMCwwLDAsNlYzMGE2LDYsMCwwLDAsNiw2SDEzLjVMMTgsNDVsNC41LTlIMzBhNiw2LDAsMCwwLDYtNlY2QTYsNiwwLDAsMCwzMCwwWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxMiAyNyAxOCAzNSAyNCAyNyAxMiAyNyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMyAyNC41IDE4IDE3LjgzIDIzIDI0LjUgMTMgMjQuNSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE4LDE4LjY3TDIyLDI0SDE0bDQtNS4zM00xOCwxN2wtNiw4SDI0bC02LThoMFoiLz48L3N2Zz4=", 32, 40);
                        }
                symbol.setOffset(0, 20);

                g.setSymbol(symbol);
                _MAP.getLayer("BusesOnMap").add(g);

                // CREATE A YELLOW LABEL FOR THE BUS NUMBER
                var textSym = new TextSymbol();
                var font = new Font();
                font.setFamily("Lato, sans-serif");
                font.setWeight(Font.WEIGHT_BOLD);
                if (parseInt(route) > 99) {
                    font.setSize(10);
                    textSym.setText(route + term);
                    if (route === "901") {
                        //textSym.setColor( new Color( [88, 211, 255, 1] ) );
                        textSym.setText("BLUE");
                    } else
                        if (route === "902" || route === "992") {
                            //textSym.setColor( new Color( [0, 255, 0, 1] ) );
                            textSym.setText("GRN");
                        } else
                            if (route === "903") {
                                //textSym.setColor( new Color( [255, 0, 0, 1] ) );
                                //font.setSize( 10 );
                                textSym.setText("RED");
                            } else
                                if (route === "904") {
                                    //textSym.setColor( new Color( [255, 165, 0, 1] ) );
                                    textSym.setText("ORNG");
                                } else
                                    if (route === "888") {
                                        //textSym.setColor( new Color( [255, 255, 255, 1] ) );
                                        textSym.setText("NSTR");
                                    } else
                                        if (route === "921") {
                                            textSym.setText("A");
                                        } else
                                            if (route === "906") {
                                                textSym.setText("SHTL");
                                            } else
                                                if (route === "922") {
                                                    textSym.setText("B");
                                                } else
                                                    if (route === "923") {
                                                        textSym.setText("C");
                                                    }
                } else {
                    font.setSize(12);
                    textSym.setText(route + term);
                }
                textSym.setColor(new Color([255, 242, 0, 1]));
                //if (flagIt) {
                //	textSym.setHaloColor(new Color("red"));
                //	textSym.setHaloSize(1);
                //}

                textSym.setOffset(0, 28);
                textSym.setFont(font);
                var t = new Graphic();
                t.setGeometry(point);
                t.setSymbol(textSym);
                _MAP.getLayer("BusesOnMap").add(t);
            }
        });
    };
    var drawBuses = function (/*boolean*/zoomOnce, /*function*/callback) {
        if (_DEBUG) console.log("+++   D R A W     B U S E S    ++ Zoom: " + zoomOnce);

        // ===================================================================
        // QUERY and FILTER BUS LOCATION FEED
        // 
        // OVERALL PROCESS ===================================================
        // Now pass through all possible bus locations and find the ones we want.
        // Filter by requested routes or all the routes that service a stop.
        // Start searching for location in the current extent (see _CURRENTLOD variable and map.extent).
        // The first time through, we zoom the screen out to include at least one bus location by
        // searching for locations in larger (smaller scale and descreasing level numbers) map extents
        // until you find at least one or you run out of the levels to search.
        // 
        // Then set the map display to that level and execute the callback.
        // If a stop was specified, the map should be centered on the stop.
        // If a route only was specified, the map should zoom to the extent of the route.
        // ===================================================================
        // 
        var routes = [];

        if (_SHOWALLBUSES) {
            routes = [0];
        } else if (_ROUTEID) {
            routes = _ROUTEID;
        } else {
            routes = _ROUTESFORSHOW;
        }
        var response = [], // the collected bus locations for all routes
            promises = []; // the deferred promises for AJAX calls to get each route
        
        for (var r = 0, rl = routes.length; r < rl; r++) {
            var route = routes[r];
            var reqURL = _LOCATION_SERVICE + route;
            promises.push(
                $.ajax({
                    type: 'get',
                    cache: false,
                    url: reqURL,
                    dataType: 'json'
                })
                    .done(function (result, status, xhr) {
                        var ct = xhr.getResponseHeader('content-type') || '';
                        if (ct.indexOf('html') > -1) { // not json response, so the service must be in error
                            console.warn('Location service failed for ' + route + ': ' + status);
                        } else { // json response
                            $.merge(response, result);
                        }
                    })
                    .fail(function () {
                        console.warn("Location service failed for route " + route);
                    })
            );
        }
        $.when.apply($, promises)
            .then(function () {
                _MAP.getLayer("BusesOnMap").clear();
                var drawnCount = 0;
                if (response.length > 0) {
                    // first draw all the buses

                    $.each(response, function () {
                        var pnt;
                        if (_ROUTESFORSTOP) {
                            // draw only buses for routes that match route AND terminal letter
                            // direction filter removed Dec 2018 to show more buses - helps circulator and bus turnaround situations
                            //testRouteTerm += this.Direction === 1 ? ":SB" : this.Direction === 2 ? ":EB" : this.Direction === 3 ? ":WB" : this.Direction === 4 ? ":NB" : "";
                            if (_ROUTESFORSTOP.indexOf(this.RouteId + this.Terminal) > -1 || _SHOWALLBUSES) {
                                pnt = newPointFromLatLong(this.Latitude, this.Longitude);  // create a point from the bus location LAT/LONG
                                drawVehicleOnMap(pnt, this.RouteId, this.Terminal, this.DirectionId, this.LocationTime, this.BlockNumber);
                                drawnCount++;
                            }
                        } else {
                            pnt = newPointFromLatLong(this.Latitude, this.Longitude);  // create a point from the bus location LAT/LONG
                            drawVehicleOnMap(pnt, this.RouteId, this.Terminal, this.DirectionId, this.LocationTime, this.BlockNumber);
                            drawnCount++;
                        }
                    });
                    // then determine a proper zoom level
                    var d = 0; // total drawn vehicle count
                    var e = _MAP.extent; // the current screen map extent
                    //if (_DEBUG) console.log("e.xmin = " + e.xmin + " e.ymin = " + e.ymin + " e.xmax = " + e.xmax + " e.ymax = " + e.ymax);
                    //if (_DEBUG) console.log(" LOD:res = " + _CURRENTLOD.resolution + " LOD:lvl = " + _CURRENTLOD.level);
                    let i = 0; // total iterations over response
                    do { // if we're not zooming we will 'do' this just once
                        // if we are zooming, the first time through we want to test the current extent -- so NO DELTA needed
                        var z = 0;
                        if (i > 0) { // let z = 0 on the first time through, after that the exponent is one less than the iteration
                            // 2^0 = 1, 2^1 = 2, 2^2 = 4 etc.
                            z = _CURRENTLOD.resolution * Math.pow(2, i - 1);  // compute a factor to multiply the resolution
                        }
                        var xDelta = z * _MAP.width / 2;
                        var yDelta = z * _MAP.height / 2;
                        if (_DEBUG) console.log(i + " xD = " + xDelta + " yD = " + yDelta + " z = " + z);

                        $.each(response, function () {
                            var p = newWMPointFromLatLong(this.Latitude, this.Longitude);
                            // don't draw buses OUTSIDE the boundaries of the current extent
                            if (p.x > e.xmin - xDelta && p.x < e.xmax + xDelta && p.y > e.ymin - yDelta && p.y < e.ymax + yDelta) {
                                        d++;

                            }
                        });
                        if (_DEBUG) console.log("Level " + (_CURRENTLOD.level - i) + " count " + d + " of " + response.length);
                        if (d > 0 && i > 0 && zoomOnce) {
                            _MAP.setLevel(_CURRENTLOD.level - i).then();
                        }
                        i++;
                    }
                    while (d === 0 && _CURRENTLOD.level - i >= _MAP.getMinZoom()); // keep zooming out until bus is found or extent too big                   
                }
                var dt = new Date();
                var tm = ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ':' + ('0' + dt.getSeconds()).slice(-2);
                $('#bomticker').html('Updated ' + tm);
                if (typeof callback === 'function') callback(d, response.length);  // return buses showing and total buses
            })
            .fail(function (err) {
                console.warn('DrawBuses call failed');
                if (typeof callback === 'function') callback(null); // return an error and fail"
            });
    };

    var showMapBanner = function (/*string*/message,/*string*/action) {
        $("#bombanner").html(message);
        $(".mapbanner").css("display", "block");
        if (action === 'fade') {
            $(".mapbanner").delay(5000).fadeOut(3000);
        }
    };
    var hideMapBanner = function () {
        $('.mapbanner').css('display', 'none');
    };
    /*
     * stop the buses location service if we're checking for number of cycles 
     * otherwise, just keep running indefinitely
     */
    var stopBusesOnMap = function () {
        clearInterval(_TIMECLOCK);
        _TICKS = 0;
        _BOMRUNNING = false;
    };
	/*
	 * Calls the MAIN BOM update routine which will:
	 * - clear the "BusesOnMap" layer of all marker
	 * - fetch the current response for bus locations
	 * - draw buses for the ROUTEID (or ROUTESFORSTOP) centered on STOPID or user's geographic location
	 * - zooms the map ONCE to a level that shows at least one bus
	 * - returns a value for the buses shown of:
	 *	 - number = vehicles on map
	 *   - zero if no buses found for route or stop/route
	 *   - NULL if service feed returns an error
     *   
     * - test the _TICKSTOP value -> if null, application continues to run 
     *   even if nothing displays.
	 */
    var updateBusesOnMap = function (/*boolean*/zoomFlag) {
        hideMapBanner();
        _BOMRUNNING = true;
        if (_TICKSTOP) { // we're keeping track of service update cycles
            _TICKS++;
            if (_TICKS > _TICKSTOP) {  // pause the service after limit reached
                stopBusesOnMap();
                showMapBanner('Real-time locations are paused.</br>' + _RESTARTACTIONVERB + ' the map to resume.');
            }
        }
        var zoomOnce = typeof zoomFlag !== 'undefined' ? zoomFlag : false;
        drawBuses(/*boolean*/zoomOnce, function (busesShowing, busesTotal) {
            if (_DEBUG) console.log("++ Buses Showing = " + busesShowing + " Total = " + busesTotal);
            if (busesShowing === null) { // service failure
                showMapBanner('Real-time locations unavailable at this time.');
                if (_TICKSTOP) {
                    stopBusesOnMap();
                    setTimeout(function () {
                        showMapBanner('Real-time locations are paused.</br>' + _RESTARTACTIONVERB + ' the map to resume.');
                    }, 10000);
                }
            }
            else if (busesTotal === 0) { // nothing to report
                if (_TICKSTOP) {
                    showMapBanner('Real-time data are not available</br>or there is no service.');
                    stopBusesOnMap();
                }
            }
        });
        if (_DEBUG) console.log("Ticks: " + _TICKS);
    };
    var drawBusesOnMap = function (/*boolean*/zoomFlag) {
        updateBusesOnMap(zoomFlag);  // do this once
        _TIMECLOCK = setInterval(updateBusesOnMap, _TIMEINTERVAL); // then do it again every tick of the TIMECLOCK
    };

    var showMapLayers = function () {
        $.each(_MAP.layerIds, function (index, layer) {
            var c = _MAP.getLayer(layer);
            var v = c.visible ? " visible" : " hidden";
            console.log("Layer: " + c.id + ", " + v + ", opacity: " + c.opacity + " " + c.url);
        });
        $.each(_MAP.graphicsLayerIds, function (index, layer) {
            var c = _MAP.getLayer(layer);
            var v = c.visible ? " visible" : " hidden";
            console.log("Graphics Layer: " + c.id + ", " + v + ", opacity: " + c.opacity + " " + c.url);
        });
    };
    /*
     * This is a utility function used for DEBUGGING purposes
     */
    var timeElapsedInSeconds = function (timestamp) {  // assumes timestamp format of string = '/Date(1470941196000-0500)/'
        var s = null;
        if (timestamp && timestamp.indexOf('(') > -1) {
            var r = timestamp.substring(timestamp.indexOf("(") + 1, timestamp.indexOf(")"));
            s = Date.now() - parseFloat(r);
        }
        return s / 1000;
    };
    var newWMPointFromLatLong = function (/*string*/lat,/*string*/long) {
        var p = null;
        require([
            "esri/geometry/Point",
            "esri/geometry/webMercatorUtils"
        ], function (Point, webMercatorUtils) {
            p = new Point(webMercatorUtils.lngLatToXY(long, lat), _MAP.spatialReference);
        });
        return p;
    };
    var newPointFromLatLong = function (/*string*/ lat,/*string*/ long) {
        var p = null;
        require(["esri/geometry/Point"
        ], function (Point) {
            p = new Point(parseFloat(long), parseFloat(lat));
        });
        return p;
    };
    var newPointFromXY = function (/*float*/x, /*float*/y) {
        var p = null;
        require(["esri/geometry/Point"], function (Point) {
            var latlng = [0, 0];
            CoordinateConversion.UTMXYToLatLon(x, y, 15, false, latlng);
            p = new Point(CoordinateConversion.RadToDeg(parseFloat(latlng[1])), CoordinateConversion.RadToDeg(parseFloat(latlng[0])));
        });
        return p;
    };

    var init = function (mapElementID) {
        return $.Deferred(function (dfd) {
            // mapType property on the <div>
            var pType = document.getElementById(mapElementID).getAttribute("maptype");
            var mapType = pType !== null ? pType : "BOM";
            //console.log(mapElementID + " functionality is " + mapType);
            require(
                ["esri/map",
                    "esri/config",
                    "esri/basemaps",
                    "esri/dijit/Scalebar",
                    "esri/dijit/LocateButton",
                    "esri/layers/GraphicsLayer",
                    "esri/layers/ArcGISDynamicMapServiceLayer",
                    "dojo/on",
                    "dojo/domReady!"
                ], function (
                    Map, esriConfig, esriBasemaps, Scalebar, LocateButton, GraphicsLayer, ArcGISDynamicMapServiceLayer, on
                ) {
                    esriConfig.defaults.map.panRate = 1;
                    esriConfig.defaults.map.panDuration = 1;

                    esriBasemaps.metCouncilWebMercator = {
                        baseMapLayers: [{ url: "https://arcgis.metc.state.mn.us/arcgis/rest/services/BaseLayer/BasemapWM/MapServer" }],
                        title: "MetCouncil"
                    };
                    esriBasemaps.transitVector = {
                        title: "TransitVector",
                        // First version of the basemap with some extra parking lots and labels
                        //baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/8cbdf505cd3f4dc39c4e5da6f5b49d95/resources/styles/root.json", type: "VectorTile" }]
                        //baseMapLayers: [{url:"/js/basemapStylev1.json", type: "VectorTile"}]
                        // 2nd version of the basemap 
                        //baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/5c2ea8c24d7a46ed8c61cd058219504f/resources/styles/root.json", type: "VectorTile" }]
                        baseMapLayers: [{ url: "/js/basemapStylev2.json", type: "VectorTile" }]
                    };
                    _MAP = new Map(mapElementID, {
                        //autoResize: true,
                        logo: false,
                        //showAttribution: true,
                        sliderPosition: "bottom-right",
                        basemap: "transitVector",
                        maxZoom: 18,
                        minZoom: 9,
                        center: [-93.27, 44.975],
                        zoom: 14
                    });

                    _MAP.on("load", function () {
                        _GEOLOCATE = new LocateButton({
                            map: _MAP,
                            //useTracking: true
                            scale: 10000
                        }, 'bomlocate');
                        _GEOLOCATE.startup();
                        _GEOLOCATE.clearOnTrackingStop = true;
                        _GEOLOCATE.on("locate", function (result) {
                            if (result.error) {
                                showMapBanner("We're unable to determine your location. Check your browser permissions.", "fade");
                            }
                        });

                        var scalebar = new Scalebar({
                            map: _MAP,
                            attachTo: "bottom-left",
                            scalebarUnit: "english"
                        });
                    });
                    _MAP.on("layer-add-result", function (result) {
                        if (result.error) {
                            console.error("Layer load failed -  " + result.error + " for " + result.layer.url);
                        }
                    });

                    _MAP.on("layers-add-result", function (result) {
                        if (_DEBUG) showMapLayers();
                        dfd.resolve();
                        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    });

                    _MAP.on("extent-change", function (evt) {
                        if (_DEBUG) console.log("extent-change fired");
                        _CURRENTLOD = evt.lod;
                        //if (_BOMRUNNING === false) {
                        //    drawBusesOnMap();
                        //}
                    });
                    _MAP.on("click", function (evt) {
                        if (_DEBUG) console.log("map clicked");
                        if (_BOMRUNNING === false) {
                            drawBusesOnMap(/*zoom*/true);
                        }
                    });

                    var layers = [];
                    layers.push(new GraphicsLayer({ id: "Markers" }));

                    var routesLayer = new ArcGISDynamicMapServiceLayer(_ROUTE_SERVICE, {
                        id: "Routes",
                        "opacity": 0.66,
                        visible: false
                    });
                    routesLayer.setVisibleLayers([_ROUTE_LAYER]);
                    routesLayer.setImageFormat('svg');
                    layers.push(routesLayer);

                    layers.push(new GraphicsLayer({ id: "BusesOnMap" }));


                    _MAP.addLayers(layers);
                });
        }).promise();
    };
	/*
	 * ShowStop
	 * accepts a bus stop ID and searches first for a Bus stop
	 * and if not found, then a train station.
	 * if still not found, returns a failure message.
	 * The return value is a deferred promise that has a return
	 * parameter of all the routes that service that stop or station.
	 */
    var showStop = function (stopID) {
        var queryWhere = "site_id = " + stopID;
        if (_DEBUG) console.log("ShowStop " + queryWhere);
        return $.Deferred(function (dfd) {

            $.ajax({
                type: "get",
                url: _STOPS_QUERY_LAYER + "/query",
                data: {
                    where: queryWhere
                    , returnGeometry: true
                    , outFields: "site_id, site_on, site_at, ROUTES, NROUTES, ROUTEDIRS, ROUTETERMDIRS"
                    , f: "json"
                },
                dataType: "json"
            })
                .done(function (r) {
                    var stopPoint = null;
                    if (r.error) {
                        console.warn("Stop lookup failed");
                        dfd.reject();
                    } else {
                        // SEARCH for STOP matching the requested ID
                        if (r.features.length > 0) {
                            if (_DEBUG) console.log("Stop Lookup succeeded");
                            var feature = r.features[0];
                            stopPoint = newPointFromXY(feature.geometry.x, feature.geometry.y); //convert to UTM result to geographic LNG/LAT
                            drawMarkerAtPoint(stopPoint);
                            // Find all ROUTES that stop here
                            // ROUTES attribute is space delimited with format like: 61 2 3 4 54
                            // ROUTETERMDIRS atttribute is comma-delimited with format {ROUTENUM}{TERM}:{DIR} where DIR is one of NB, SB, EB, WB like: 64B:NB, 61:EB
                            var work, routesForStop = []; // Route + Term + Dir -- we use this list to match to actual bus identifiers
                            var routeNums = []; // just the route nums -- we use this list to draw the routes
                            if (typeof feature.attributes !== 'undefined') {
                                routeNums = feature.attributes["ROUTES"].split(" ");
                                if (feature.attributes.hasOwnProperty("ROUTETERMDIRS") && feature.attributes["ROUTETERMDIRS"] !== "") {
                                    work = feature.attributes["ROUTETERMDIRS"].split(","); // from BOM_POINTS for stops
                                    $.each(work, function (idx, v) {  // strip off the direction
                                        routesForStop.push(v.trim().substring(0, v.indexOf(':')));
                                    });
                                }
                            }
                            dfd.resolve(routeNums, routesForStop, stopPoint);
                        }
                        else {
                            console.warn("stops query returned no results: " + stopID);
                            dfd.reject();
                        }
                    }
                })
                .fail(function () {
                    console.warn("Stop service failed");
                    dfd.reject();
                });
        }).promise();
    };
	/* -----------------------------------------------------
	 * ShowRoute ===========================================
	 * accepts an array of bus routes to highlight on the map and
	 * creates a deferred promise that when complete, 
	 * returns the extent of the route(s) requested
	 * or else a failure signal.
	 */
    var showRoute = function (/*[string]*/routes) {
        var routesQuery = [];
        routes = routes.filter(function (value, idx, arr) {
            return value !== '906';
        });
        var queryWhere = "ROUTENUMBER in (";
        for (var i = 0; i < routes.length; i++) {
            if (i > 0) { queryWhere += ","; }
            queryWhere += routes[i];
        }
        queryWhere += ")";
        if (_DEBUG) console.log("ShowRoute " + queryWhere);
        routesQuery[_ROUTE_LAYER] = queryWhere;
        _MAP.getLayer("Routes").setLayerDefinitions(routesQuery);

        return $.Deferred(function (dfd) {
            $.ajax({
                type: "get",
                cache: false,
                url: _ROUTE_SERVICE + "/" + _ROUTE_LAYER + "/query",
                data: {
                    where: queryWhere
                    , returnGeometry: true
                    , outFields: "ROUTENUMBER"
                    , f: "json"
                },
                dataType: "json"
            })
                .then(function (r) {
                    if (r.error) {
                        console.warn("Route lookup error " + queryWhere);
                        dfd.reject();
                    } else {
                        if (r.features.length > 0) {
                            var extent = null;
                            require(["esri/geometry/Polyline"
                            ], function (Polyline) {
                                for (var i = 0, l = r.features.length; i < l; i++) {
                                    var g = new Polyline({
                                        paths: r.features[i].geometry.paths,
                                        spatialReference: r.spatialReference
                                    });
                                    if (i === 0) {
                                        extent = g.getExtent();
                                    } else {
                                        extent = extent.union(g.getExtent());
                                    }
                                }
                            });
                            _MAP.getLayer("Routes").setVisibility(true);
                            dfd.resolve(extent);
                        } else {
                            console.warn("route query returned no results: " + queryWhere);
                            dfd.reject();
                        }
                    }
                },
                    function (err) {
                        console.warn("Route service failure");
                        dfd.reject();
                    });
        }).promise();
    };
	/*
	 * This routine is called once at page load or page refresh
	 * It displays the route and/or the stop with graphics
	 * It sets the initial extent and centers the screen on 
	 * the STOP or the ROUTE.
	 * 
	 * Then it launches the routine to draw bus locations.
     * 
     * Parameters: object 
     * { "stopID": string,
     *   "routeID": string,
     *   "zoomToNearestBus": boolean,
     *   "stopZoomLevel": integer from 9 - 15+
     *  }
	 * 
	 */
    var startBusesOnMap = function (/*object*/parms) {
        _GEOLOCATE.clear();
        _SHOWALLBUSES = false;
        _ROUTEID = null;
        _ROUTESFORSHOW = null;
        _ROUTESFORSTOP = null;
        if (parms.routeID) {
            if (parms.routeID === "0") {
                _SHOWALLBUSES = true;
            } else {
                // convert comma-delimited string of routes to array
                _ROUTEID = parms.routeID.split(",");
            }
        }

        var stopPoint = null;
        if (parms.stopID) {
            $.when(showStop(parms.stopID)
            ).then(function (routenums, routesForStop, point) {
                if (point) stopPoint = point;
                _ROUTESFORSHOW = routenums;  // these have route number only
                _ROUTESFORSTOP = routesForStop; // these have route and term letter (direction stripped)
                if (_ROUTEID) {
                    showRoute(_ROUTEID);
                }
                else {
                    showRoute(routenums);
                }
            }).then(function (extentOfRoutes) {
                _MAP.centerAndZoom(stopPoint, parms.stopZoomLevel).then(function () { drawBusesOnMap(parms.zoomToNearestBus); });
            }).fail(function () {
                console.warn('Requested stop ' + parms.stopID + ' not found.');
                //showMapBanner('Requested stop ' + parms.stopID + ' not found.');
            });
        } else {
            if (_SHOWALLBUSES) {
                drawBusesOnMap(parms.zoomToNearestBus);
            } else if (_ROUTEID) {
                $.when(showRoute(_ROUTEID)
                ).then(function (extentOfRoutes) {
                    if (extentOfRoutes) {
                        _MAP.setExtent(extentOfRoutes, true)
                            .then(function () { drawBusesOnMap(parms.zoomToNearestBus); });
                    }
                }).fail(function () {
                    console.warn('Requested route ' + parms.routeID + ' not found.');
                    //showMapBanner("Requested route not found.");
                });
            } else {
                showMapBanner('No stop or route requested.');
            }
        }

    }; 
    // ===================================================================
    // This runs from iMap/ShowMyBus.aspx
    // and uses the routing /imap/<stop>/<route> where
    // <stop> is required and is either a valid stop number or zero
    // <route> is optional. If stop is zero and the route number valid, 
    // it display the route line and shows all bus locations on route.
    // If stop is a valid stop number, it will zoom to the stop and 
    // show just the buses for the specified route, or busses for all
    // routes that service that stop.
    // ====================================================================
    var fullPageBOM = function (/*string*/mapDiv,/*string*/stop,/*string*/route) {
        var h = $(window).height();
        if (h > 1000) {
            $('.map').css({ 'height': h - 220 });
        } else if (h > 600) {
            $('.map').css({ 'height': h - 160 });
        }
        var parms = {
            stopID: stop,
            routeID: route,
            zoomToNearestBus: true,
            stopZoomLevel: 16
        };
        init(mapDiv).then(function () {
            startBusesOnMap(parms);            
        });
    };

    return {
        fullPageBOM: fullPageBOM,
        geoLocate: geoLocate, // zoom to user location
        BOM_running: BOMStatus, // true if BOM is running otherwise false
        clearMarkerAtPoint: clearMarkerAtPoint, // removes the stopID marker from the map
        drawBusesOnMap: drawBusesOnMap, // call this after moving to a new location on the map like after user presses 'Find Me'
        startBusesOnMap: startBusesOnMap, // call this after layers loaded 
        stopBusesOnMap: stopBusesOnMap, // call this after any error to stop auto updates
        setTimeInterval: setTimeInterval, // call to set a new milliseconds to refresh the location service
        setTickStop: setTickStop, // call to set a new number of interval cycles before pausing the service update cycle; 0 = no timeout
        init: init // call this to initially set things up - input map parameter + three layer names, returns three layers 
    };

})(jQuery, window, document);

$(function () {
    // ----------------------------------------------------
    // schedules-maps
    // ----------------------------------------------------
    if ($("#TRIMap").attr("maptype") === "full") {
        // This one loads the Search field in the schedules-maps page -- the search result
        // automatically sets the map to zoom to the requested location
        AutocompleteAddress.init("interactiveMapSearch",/*UTMout*/ false,
                function() {
                var choice = AutocompleteAddress.getChoice("interactiveMapSearch");
                TRIM.centerMarkerAtPoint(choice.location.x, choice.location.y);
                }
            );
        TRIM.init("TRIMap").then(function () {
            //TRIM.geoLocate();
        });
        $("#stopsStationsMapLayer").click(function () {
            TRIM.toggleLayer("allStops",/*zoomLevel*/14);
        });
        $("#parkRideMapLayer").click(function () {
            TRIM.toggleLayer("parkAndRides",/*zoomLevel*/10);
        });
        $("#niceRideMapLayer").click(function () {
            TRIM.toggleLayer("niceRides",/*zoomLevel*/14);
        });
    }
});