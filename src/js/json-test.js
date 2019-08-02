$(document).ready(function() {

    // HTML element that will hold the data.
    var animalContainer = $('#animalInfo');

    //var btn = document.getElementById("btn");
    var btn = $('#btn');

    //btn.addEventListener("click", function() {
    btn.click(function() {
        // Create variable to receive the data from the request.
        var ourRequest = new XMLHttpRequest(); // Expects the ".open" method.

        // Use the "open" method to tell the browser to "get" the data (GET is the first argument) from the url provided in the second argument.
        ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');

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
    });

    // A new function to create and and html to the page.
    function renderHTML(data) { // Include 1 parameter.

        // Empty string to concatenate our data to.
        htmlString = "";

        // Loop through objects
        for (i = 0; i < data.length; i++) {
            // concatenate data to htmlStrong
            htmlString += "<p>" + data[i].name + " is a " + data[i].species + ".</p>";
        }

        animalContainer.append(htmlString);
    }
});
