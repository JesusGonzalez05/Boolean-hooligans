// click handler for tiles
var randomTileEl = $("#random-tile")
var cheapestTileEl = $("#cheapest-tile")
var previousTileEl = $("#previous-tile")
	
randomTileEl.on('click', function () {
  alert('Hello Random');
});

cheapestTileEl.on('click', function () {
  alert('Hello cheapest');
});

previousTileEl.on('click', function () {
  alert('Hello previous');
});

// event listener for search bar
var searchButton = document.querySelector(".search-bar");
var locationInput = document.querySelector(".input");
  
// Listen for a click event on search bar

searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  submitLocation();
});

// allows user to type in location
var submitLocation = function () {
  var desiredLocation = locationInput.value.trim();
  
  if (desiredLocation) {
    window.location.href = `./second.html?search=${desiredLocation}`
 	getLocation(desiredLocation);
  } else {
	//   ask user to enter a valid city or location
  }
};

// Random Country
let randomPlaceElement = document.getElementById("randomPlace")
let randomIndex = Math.floor(Math.random() * countryList.length)
let randomCountry = countryList[randomIndex]
let randomCountry2 = countryList2[randomIndex]
console.log(randomCountry)

$("#randomPlace").text(randomCountry2)

