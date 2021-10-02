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

// part2. search date/time, city, state, country and/or shape

// Select the button
var button = d3.select("button#filter-btn");

// Select the form
var form = d3.select(".form-group");

// get all the possible value for datetime, city, state, country and shape in teh tableData
// bring in underscore.js in the index.html
var datetimeAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.datetime; }));
var cityAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.city; }));
var stateAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.state; }));
var countryAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.country; }));
var shapeAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.shape; }));
// verify by printing in the console
console.log(datetimeAll);
console.log(cityAll);
console.log(shapeAll);
console.log(countryAll);
console.log(shapeAll);

// Create event handlers 
button.on("click", runEnter);
form.on("submit",preventSubmit);

function preventSubmit() {
  d3.event.preventDefault;
}

// Complete the event handler function for the form
function runEnter() {
    // Select the input element and get the raw HTML node
    var inputDateElement = d3.select("#datetime");
    var inputCityElement = d3.select("#city");
    var inputStateElement = d3.select("#state");
    var inputCountryElement = d3.select("#country");
    var inputShapeElement = d3.select("#shape");
    // Get the value property of the input element
    // if there is no input for particular element, then return all the possible values in the tableData
    // put the result in an array
    if (inputDateElement.property("value")) {
        var inputDate = [inputDateElement.property("value")];
    } else {
        inputDate = datetimeAll;
    }
    if (inputCityElement.property("value")) {
        var inputCity = [inputCityElement.property("value")];
    } else {
        inputCity = cityAll;
    }
    if (inputStateElement.property("value")) {
        var inputState = [inputStateElement.property("value")];
    } else {
        inputState = stateAll;
    }
    if (inputCountryElement.property("value")) {
        var inputCountry = [inputCountryElement.property("value")];
    } else {
        inputCountry = countryAll;
    }
    if (inputShapeElement.property("value")) {
        var inputShape = [inputShapeElement.property("value")];
    } else {
        inputShape = shapeAll;
    }

    // Use the form input to filter the data
    // use includes function to return true or false in an array
    var matches = tableData.filter(function (ufo){
        return (inputDate.includes(ufo.datetime) && inputCity.includes(ufo.city) && 
            inputState.includes(ufo.state) && inputCountry.includes(ufo.country) && inputShape.includes(ufo.shape));
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