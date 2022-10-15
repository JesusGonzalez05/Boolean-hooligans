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
var searchedFligthsEl = document.querySelector('#searched-flights');


// allows user to type in location
var submitLocation = function () {
	var desiredLocation = locationInput.value.trim();
  
	if (desiredLocation) {
	  getLocation(desiredLocation);
 
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
		.then(response => flightPricing(response.segment[0], cityCode))
		.catch(err => console.error(err));
};
// place city and flight info and grab price for associated flights
var flightPricing = function (flights, city){

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
			'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
		}
	};
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + city + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
		.then(response => response.json())
		.then(response => console.log(response.pricedItinerary[0], flights, city))
		.catch(err => console.error(err));

};