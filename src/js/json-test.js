$(document).ready(function() {

    // This variable is used in the ajax url request to increase the page count by 1 to get additional json data.
    var pageCounter = 1;

    // HTML element that will hold the data.
    var animalContainer = $('#animalInfo');

    //var btn = document.getElementById("btn");
    var btn = $('#btn');

    //btn.addEventListener("click", function() {
    btn.click(function() {
        // Create variable to receive the data from the request.
        var ourRequest = new XMLHttpRequest(); // Expects the ".open" method.

        // Use the "open" method to tell the browser to "get" the data (GET is the first argument) from the url provided in the second argument.
        ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

        // Use the "onload" method to say what we want to happen
        ourRequest.onload = function() {
            // show data in console
            //console.log(ourRequest.responseText);

            // Save data into a variable. Use "JSON.parse" to tell the browser to read as json.
            var ourData = JSON.parse(ourRequest.responseText);

            // Get the first set of data (starts at zero).
            //console.log(ourData[0]);

            // The render function (from below) and pass in our data.
            renderHTML(ourData);
        };

        // Send request
        ourRequest.send();

        // Increment page counter by 1.
        pageCounter++;

        if (pageCounter > 3) {
            btn.hide();
        }
    });

    // A new function to create and and html to the page.
    function renderHTML(data) { // Include 1 parameter.

        // Empty string to concatenate our data to.
        htmlString = '';

        // Loop through objects
        for (i = 0; i < data.length; i++) {
            // concatenate data to htmlStrong
            htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';

            // loop through nested objects
            for (ii = 0; ii < data[i].foods.likes.length; ii++) {
                if (ii == 0) {
                    htmlString += data[i].foods.likes[ii];
                } else {
                    htmlString += ' and ' + data[i].foods.likes[ii];
                }
            }

            htmlString += ' and dislikes ';

            for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
                if (ii == 0) {
                    htmlString += data[i].foods.dislikes[ii];
                } else {
                    htmlString += ' and ' + data[i].foods.dislikes[ii];
                }
            }

            // Add on the period and close the paragraph.
            htmlString += '.</p>';
        }

        animalContainer.append(htmlString);
    }
});
