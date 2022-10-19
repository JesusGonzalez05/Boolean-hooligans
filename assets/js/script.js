// datepicker
$(function () {
  $("#departure-date").datepicker();
});

// click handler for tiles
var randomTileEl = $("#random-tile");
var cheapestTileEl = $("#cheapest-tile");
var previousTileEl = $("#previous-tile");

randomTileEl.on("click", function () {
  console.log("you clicked random tile");
  // get text off card for random location
  var text = document.querySelector("#randomPlace").textContent;
  // pass value to submitRandomLocation function
  submitRandomLocation(text);
});

cheapestTileEl.on("click", function () {
	window.location.href = `./second.html?showCheapestFlights=true`;
  //   alert('Hello cheapest');
 
});

previousTileEl.on("click", function (event) {
  event.preventDefault();
  submitPrevLocation();
  // alert('Hello previous');
});

// event listener for arrival search bar
var searchButton = document.querySelector("#submit");
var departureInput = document.querySelector("#departure");
var locationInput = document.querySelector("#arrival");

// event listener for search bar
var searchButton = document.querySelector(".search-bar");
var locationInput = document.querySelector(".input");

// search bar auto complete
var search_terms = [
  "New York",
  "San Francisco",
  "Houston",
  "Las Vegas",
  "Honolulu",
  "Washington",
  "Miami",
  "Los Angeles",
  "New Orleans",
  "Orlando",
  "Chicago",
  "Georgia",
  "Boston",
  "Colorado",
  "Seattle",
  "San Antonio",
];

function autocompleteMatch(input) {
  if (input == "") {
    return [];
  }
  var reg = new RegExp(input);
  return search_terms.filter(function (term) {
    if (term.match(reg)) {
      return term;
    }
  });
}
var res = document.getElementById("result");
function showResults(val) {
  res.innerHTML = "";
  res.classList = "has-background-white has-text-black";

  var list = "";

  var terms = autocompleteMatch(val);

  for (i = 0; i < terms.length; i++) {
    list += "<li>" + terms[i] + "</li>";
  }
  res.innerHTML = "<ul>" + list + "</ul>";

  list.classList = "has-text-black";
}

// event listener for autocomplete items
res.addEventListener("click", function (event) {
  var setValue = event.target.innerText;
  res.innerHTML = setValue;
  submitLocation(setValue);
});

// event listener for search bar
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  submitLocation();
});

// allows user to type in location
var submitLocation = function () {
  var desiredLocation = locationInput.value.trim();
  var desiredDeparture = departureInput.value.trim();

  localStorage.setItem("previous location", desiredLocation);
  localStorage.setItem("departureLocation", desiredDeparture);

  if (desiredLocation) {
    window.location.href = `./second.html?search=${desiredLocation}`;
    getLocation(desiredLocation, desiredDeparture);
  } else {
    //   ask user to enter a valid city or location
  }
};

// allows user to visit their previous choice in location
var submitPrevLocation = function () {
  var prevDesiredLocation = localStorage.getItem("previous location");

  if (prevDesiredLocation) {
    window.location.href = `./second.html?search=${prevDesiredLocation}`;
    getLocation(prevDesiredLocation);
  }
};

// Random Country
let randomPlaceElement = document.getElementById("randomPlace");
let randomIndex = Math.floor(Math.random() * countryList.length);
let randomCountry = countryList[randomIndex];
let randomCountry2 = countryList2[randomIndex];
console.log(randomCountry);

$("#randomPlace").text(randomCountry2);



// allows user to submit random location
var submitRandomLocation = function (randomLocation) {
  if (randomLocation) {
    window.location.href = `./second.html?search=${randomLocation}`;
    getLocation(randomLocation, desiredDeparture);
  } else {
    //   ask user to enter a valid city or location
    alert("please enter a valid location");
  }
};



// Burger Menu Button
$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});
