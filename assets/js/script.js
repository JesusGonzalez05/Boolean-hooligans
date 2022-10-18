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

previousTileEl.on('click', function (event) {
  event.preventDefault();
  submitPrevLocation();
	// alert('Hello previous');
});

// event listener for search bar
var searchButton = document.querySelector(".search-bar");
var locationInput = document.querySelector(".input");

// search bar auto complete
var search_terms = ['New York', 'San Francisco', 'Houston', 'Las Vegas', 'Honolulu', 'Washington', 'Miami', 'Los Angeles', 'New Orleans', 'Orlando', 'Chicago', 'Georgia', 'Boston', 'Colorado', 'Seattle', 'San Antonio'];

function autocompleteMatch(input) {
  if (input == '') {
    return [];
  }
  var reg = new RegExp(input)
  return search_terms.filter(function(term) {
	  if (term.match(reg)) {
  	  return term;
	  }
  });
};
var res = document.getElementById("result");
function showResults(val) {

  res.innerHTML = '';
  res.classList = 'has-background-white has-text-black';

  var list = '';

  var terms = autocompleteMatch(val);

  for (i=0; i<terms.length; i++) {
	list += '<li>' + terms[i] + '</li>';

  }
  res.innerHTML = '<ul>' + list + '</ul>';
  
  list.classList = 'has-text-black';
};

// event listener for autocomplete items 
res.addEventListener ("click", function (event) {
	var setValue = event.target.innerText;
	res.innerHTML = setValue;
	submitLocation(setValue);
});
  
// event listener for search bar
searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  submitLocation();
});

// allows user to type in location
var submitLocation = function () {
  var desiredLocation = locationInput.value.trim();
  var desiredDeparture = departureInput.value.trim();

  localStorage.setItem('previous location', desiredLocation);
  localStorage.setItem('departureLocation', desiredDeparture);
  
  if (desiredLocation) {
    window.location.href = `./second.html?search=${desiredLocation}`
 	getLocation(desiredLocation, desiredDeparture);
  } else {
	 //   ask user to enter a valid city or location
  }
};

// allows user to visit their previous choice in location
var submitPrevLocation = function () {
  var prevDesiredLocation = localStorage.getItem('previous location');
  	
	if (prevDesiredLocation) {
	  window.location.href = `./second.html?search=${prevDesiredLocation}`
	   getLocation(prevDesiredLocation);
	} 
  };

// Random Country
let randomPlaceElement = document.getElementById("randomPlace")
let randomIndex = Math.floor(Math.random() * countryList.length)
let randomCountry = countryList[randomIndex]
let randomCountry2 = countryList2[randomIndex]
console.log(randomCountry)

$("#randomPlace").text(randomCountry2)

// Cheapest Flights
var cheapestFlights = function() {

	let cheapTile = document.getElementById("cheap-tile");
	let cheapFlight = document.createElement("div")
	cheapTile.append(cheapFlight)

	let destination = document.createElement("div")
	let origin = document.createElement("div")
	let price = document.createElement("div")

	cheapFlight.append(destination)
	cheapFlight.append(origin)
	cheapFlight.append(price)




	const randomPlace = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '2f918a3dc9msh1f4883347966f63p1bf890jsna7079f2bda98',
			'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
		}
	};

	fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=United%20States`, randomPlace)
		.then(response => response.json())
		.then(response => {
			let randomCityIndex = Math.floor(Math.random() * response.length)
			let citycode = response[randomCityIndex]
			console.log(response);
			console.log(citycode.id)
			origin.textContent = citycode.itemName

			
		const options = {
			method: 'GET',
			headers: {
				'X-Access-Token': 'a8314f1511ec1cb9c2b8906c4a6cf4fb',
				'X-RapidAPI-Key': '2f918a3dc9msh1f4883347966f63p1bf890jsna7079f2bda98',
				'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
			}
		};

		fetch(`https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=MCO&page=1&currency=USD&destination=${citycode.id}`, options)
			.then(response => response.json())
			.then(response => {
				var keys = Object.keys(response.data);

				for (var i = 0; i < keys.length; i++) {
					var val = response.data[keys[i]];
					price.textContent = val[0].price
				}
			})
			.catch(err => console.error(err));
		})
		.catch(err => console.error(err));
}

// datepicker
$(function () {
	$('#departure-date').datepicker()
  });



// Uncomment in order to display cheapest flights tile content
// Please comment out after testing in order to save API calls

// cheapestFlights()



// Burger Menu Button
$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
  
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });