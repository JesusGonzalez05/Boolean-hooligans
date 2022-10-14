// grabs booking API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '65e16b89e8mshedc69d6608fb0a2p1ff7c4jsndf458c0cca5a',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};

fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=Berlin', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// grabs sky scanner API
const skyScannerOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '65e16b89e8mshedc69d6608fb0a2p1ff7c4jsndf458c0cca5a',
		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
};

fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=NYC&date_departure=2022-11-15&location_departure=MOW&sort_order=PRICE&number_of_stops=1&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', skyScannerOptions)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// event listener for search bar
var searchButton = document.querySelector(".search-bar");
var locationInput = document.querySelector(".input");


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

// searches for location
var getLocation = function (location) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '65e16b89e8mshedc69d6608fb0a2p1ff7c4jsndf458c0cca5a',
			'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
		}
	};
	
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + location, options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
  };