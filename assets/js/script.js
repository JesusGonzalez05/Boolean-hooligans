//booking API


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
// 		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
// 	}
// };

// fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=Berlin', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// grabs Priceline API


// const pricelineOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '65e16b89e8mshedc69d6608fb0a2p1ff7c4jsndf458c0cca5a',
// 		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
// 	}
// };

// fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=NYC&date_departure=2022-11-15&location_departure=MOW&sort_order=PRICE&number_of_stops=1&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', skyScannerOptions)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


	
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
var searchedFlightsEl = document.querySelector('#searched-flights');


// allows user to type in location
var submitLocation = function () {
	var desiredLocation = locationInput.value.trim();
  
	if (desiredLocation) {
	//   getLocation(desiredLocation);
	window.location.href = `./second.html?search=${desiredLocation}`
 
	} else {
	//   ask user to enter a valid city or location
	}
};
  
// Listen for a click event on search bar
searchButton.addEventListener("click", function() {
	submitLocation();
});


// searches for location in booking api
var getLocation = function (location) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
			'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
		}
	};
	
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + location, options)
		.then(response => response.json())
		.then(response => inputLocation(response[1].city_name))
		.catch(err => console.error(err));
		};
// places location in priceline flights location api to look for city code

var inputLocation = function (Location) {
	// console.log(Location);
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };

  fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name='+ Location, options)
	.then(response => response.json())
	.then(response => recieveFlight(response[0].cityCode))
	.catch(err => console.error(err));
};
// places city code into priceline and search flights

var recieveFlight = function (cityCode) {

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
			'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
		}
	};
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
		.then(response => response.json())
		.then(response => pricedItinerary(response.segment[0], cityCode))
		.catch(err => console.error(err));
};
// place city and flights info and grab price itinerary for all flights
var pricedItinerary = function (flights, city){

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
			'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
		}
	};
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + city + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
		.then(response => response.json())
		.then(response => displayFlights(response.pricedItinerary[0].pricingInfo['baseFare'], flights, city))
		.catch(err => console.error(err));

};

// create a function that will loop through all flights info and itinerary pricing and display on page
var displayFlights = function (prices, flights, city) {


	if (flights.length === 0) {
	  searchedFlightsEl.textContent = 'No flights found.';
	  return;
	}
  
// searchedFlightsEl.textContent = 'Showing flights for: ' + city;
  
	for (var i = 0; i < flights.length; i++) {
	  var flightArrival = flights[i].arrivalDateTime;
	  var flightDeparture = flights[i].departDateTime;
	  var flightDest = flights[i].destAirport;
	  var flightNumber = flights[i].flightNumber;
	  var flightOrigin = flights[i].origAirport;
  
	  var flightEl = document.createElement('div')
	  flightEl.classList = 'tile is-child box'

	  var flightArrivalEl = document.createElement('p');
	  flightArrivalEl.classList = 'title';
	  flightArrivalEl.textContent = flightArrival;

	  var flightDepartureEl = document.createElement('p');
	  flightArrivalEl.classList = 'title';
	  flightArrivalEl.textContent = flightDeparture;

	  flightEl.appendChild(flightArrivalEl + flightDepartureEl);

	  var flightDestEl = document.createElement('p');
	  flightDestEl.textContent = flightDest;

	  flightEl.appendChild(flightDestEl);

	  var flightNumberEl = document.createElement('p');
	  flightNumberEl.textContent = flightDeparture;

	  flightEl.appendChild(flightNumber);

	  var flightOriginEl = document.createElement('p');
	  flightOriginEl.textContent = flightDeparture;

	  flightEl.appendChild(flightOrigin);
	}

	console.log (prices);
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

// Uncomment in order to display cheapest flights tile content
// Please comment out after testing in order to save API calls

// cheapestFlights()