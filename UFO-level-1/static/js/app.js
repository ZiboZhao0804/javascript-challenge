// from data.js
var tableData = data;

// YOUR CODE HERE!
// Get a reference to the table body
var tbody = d3.select("tbody");

//example data entry
// {
//     datetime: "1/1/2010",
//     city: "benton",
//     state: "ar",
//     country: "us",
//     shape: "circle",
//     durationMinutes: "5 mins.",
//     comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
//   }

// part1. append all data
tableData.forEach(
    function(ufo) {
        var row = tbody.append("tr");
        var values = Object.values(ufo);
        values.forEach(
            function(val){
                row.append("td").text(val);
            }
        )
    }
);

// part2. search date/time

// Select the button
var button = d3.select("button#filter-btn");

// Select the form
var form = d3.select(".form-group");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",preventSubmit);

function preventSubmit() {
  d3.event.preventDefault;
}
// Complete the event handler function for the form
function runEnter() {
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");
  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  // Use the form input to filter the data by datetime
  var matches = tableData.filter(function (ufo){
    return ufo.datetime === inputValue;
  });
  
  // Finally, display the matches ufo sightings

  tbody.html(""); //clear out the output before doing new
  matches.forEach(
    function(ufo) {
        var row = tbody.append("tr");
        var values = Object.values(ufo);
        values.forEach(
            function(val){
                row.append("td").text(val);
            }
        )
    }
)};