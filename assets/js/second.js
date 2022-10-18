var searchedFlightsEl = document.querySelector('#searched-flights');
var flightsContainerEl = document.querySelector('#flights-container');
var recommendedHotels = document.querySelector ('#rec-container')

// allows user to type in location
var startSearch = function () {
  const urlParams = new URLSearchParams(window.location.search);
  var desiredLocation = urlParams.get("search")
  
  if (desiredLocation) {
    getLocation(desiredLocation)
  } else {
	//   ask user to enter a valid city or location
	}
};
  
// searches for location in booking api
var getLocation = function (location, origin) {
  const options = {
    method: 'GET',
	headers: {
	'X-RapidAPI-Key': '8663beff5emshbc88cb7c90f6122p185b9cjsncd1207a86433',
	'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
  };
	
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + location, options)
	  .then(response => response.json())
	  .then(response => inputLocation(response[1].city_name, origin))
	  .catch(err => console.error(err));
	
//   localStorage.setItem('previous-location', location);
};

// places location in priceline flights location api to look for city code
var inputLocation = function (Location) {
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '37d0f0e1a2msha9631fa8067f732p1c0c51jsnea15de398a24',
		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };

  fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name='+ Location, options)
    .then(response => response.json())
	.then(response => recieveFlight(response[0].cityCode, origin))
	.catch(err => console.error(err));
};

// places city code into priceline and search flights
var recieveFlight = function (cityCode) {
  let origin = localStorage.getItem("departureLocation")
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '37d0f0e1a2msha9631fa8067f732p1c0c51jsnea15de398a24',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode + '&date_departure=2022-11-15&location_departure=' + origin + '&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
	  .then(response => response.json())
	  .then(response => {
      pricedItinerary(response.segment, cityCode)
      console.log(origin);
    })
	  .catch(err => console.error(err));
};

// place city and flights info and grab price itinerary for all flights
var pricedItinerary = function (flights, city){
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '37d0f0e1a2msha9631fa8067f732p1c0c51jsnea15de398a24',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + city + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
	  .then(response => response.json())
	  .then(response => displayFlights(response.pricedItinerary, flights, city))
	  .catch(err => console.error(err));

};

// create a function that will loop through all flights info and itinerary pricing and display on page
var displayFlights = function (prices, flights, city) {
  if (flights.length === 0) {
    searchedFlightsEl.textContent = 'No flights found.';
	return;
  }
  
  searchedFlightsEl.textContent = 'Showing flights for: ' + city;
  
//   for (var i = 0; i < flights.length; i++) {
	
  
  var flightEl = document.createElement('div')
  flightEl.classList = 'tile is-child box'

  var flightOriginEl = document.createElement('p')
  flightOriginEl.classList = 'title';
  flightOriginEl.textContent = flights[0].origAirport;

  var flightDepartureEl = document.createElement('p');
  flightDepartureEl.classList = 'subtitle';
  flightDepartureEl.textContent = 'Departure Date and Time: ' + flights[0].departDateTime;

  var flightDestEl = document.createElement('p')
  flightDestEl.classList = 'title';
  flightDestEl.textContent = flights[0].destAirport;
	  
  var flightArrivalEl = document.createElement('p');
  flightArrivalEl.classList = 'subtitle';
  flightArrivalEl.textContent = 'Arrival Date and Time: ' + flights[0].arrivalDateTime;

  var flightNumberEl = document.createElement('p')
  flightNumberEl.classList = 'subtitle';
  flightNumberEl.textContent = 'Flight Number: ' + flights[0].flightNumber;

  var flightPriceEl = document.createElement('p')
  flightPriceEl.classlist = 'title'
  flightPriceEl.textContent = '$' + prices[0].pricingInfo['baseFare']

  flightsContainerEl.appendChild(flightEl);
  flightEl.appendChild(flightOriginEl);
  flightEl.appendChild(flightDepartureEl);
  flightEl.appendChild(flightDestEl);
  flightEl.appendChild(flightArrivalEl);
  flightEl.appendChild(flightNumberEl);
  flightEl.appendChild(flightPriceEl);	  
// ]
}
startSearch();



// Hotel Recs
var hotelRecs = function(response) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dd725b9050mshd3130fdab545faep13532ajsn6a3bc71a0180',
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
    };
    
    fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=Atlanta&search_type=HOTEL`, options)
        .then(response => response.json())
        .then(response => displayHotels(response[0].itemName))
        .catch(err => console.error(err));
}

var displayHotels = function(hotelName) {
    var recsEl = document.createElement('div')
    recsEl.classList = 'tile is-child box is-success"'
    
    var hotelRecsEl = document.createElement('p')
    hotelRecsEl.classList = 'title ';
    hotelRecsEl.innerHTML = hotelName;
    
    
    recommendedHotels.appendChild(recsEl);
    recsEl.appendChild(hotelRecsEl);
    
}

hotelRecs();



