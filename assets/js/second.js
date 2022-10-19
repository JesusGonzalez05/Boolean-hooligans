var searchedFlightsEl = document.querySelector('#searched-flights');
var flightsContainerEl = document.querySelector('#flights-container');
var recommendedHotels = document.querySelector ('#rec-container')

// Hotel Recs
var hotelRecs = function(city) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dd725b9050mshd3130fdab545faep13532ajsn6a3bc71a0180',
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
    };
    
    fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${city}&search_type=HOTEL`, options)
        .then(response => response.json())
        .then(response => displayHotels(response))
        .catch(err => console.error(err));
}

var displayHotels = function(hotels) {
    var recsEl = document.createElement('div')
    recsEl.classList = 'tile is-child box is-success"'

    for (let index = 0; index < hotels.length; index++) {
        var hotelRecsEl = document.createElement('p')
        hotelRecsEl.classList = 'title ';
        hotelRecsEl.innerHTML = hotels[index].itemName;
        
        
        recommendedHotels.appendChild(recsEl);
        recsEl.appendChild(hotelRecsEl);
    
        
    }
    
}

// allows user to type in location
var startSearch = function () {
  const urlParams = new URLSearchParams(window.location.search);
  var desiredLocation = urlParams.get("search")
  
  if (desiredLocation) {
    getLocation(desiredLocation)
    hotelRecs(desiredLocation);
  } else {
	//   ask user to enter a valid city or location
	}
    
};
  
// searches for location in booking api
var getLocation = function (location) {
  const options = {
    method: 'GET',
	headers: {
	'X-RapidAPI-Key': ' 4a5f6fee8fmsh4a330a6980ce7ffp15ff0cjsn2de94c5e60f0',
	'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
  };
	
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + location, options)
	  .then(response => response.json())
	  .then(response => inputLocation(response[1].city_name))
	  .catch(err => console.error(err));
	
//   localStorage.setItem('previous-location', location);
};

// places location in priceline flights location api to look for city code
var inputLocation = function (Location) {
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': ' 4a5f6fee8fmsh4a330a6980ce7ffp15ff0cjsn2de94c5e60f0',
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
  let origin = localStorage.getItem("departureLocation")
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': ' 4a5f6fee8fmsh4a330a6980ce7ffp15ff0cjsn2de94c5e60f0',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode + '&date_departure=2022-11-15&location_departure=' + origin + '&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
	  .then(response => response.json())
	  .then(response => pricedItinerary(response.segment, cityCode))
	  .catch(err => console.error(err));
};

// place city and flights info and grab price itinerary for all flights
var pricedItinerary = function (flights, city){
  var departureDate = $("#departure-date").val()
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': ' 4a5f6fee8fmsh4a330a6980ce7ffp15ff0cjsn2de94c5e60f0',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + city + '&date_departure=' + "2022-10-23" + '&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=10', options)
	  .then(response => response.json())
	  .then(response => {
      console.log(response);
      displayFlights(response.pricedItinerary, flights, city)})
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
  var departureIcon = document.createElement('i')
  departureIcon.classList = "fa-solid fa-plane-departure";


  var flightDepartureEl = document.createElement('p');
  flightDepartureEl.classList = 'subtitle';
  flightDepartureEl.textContent = 'Departure Date and Time: ' + flights[0].departDateTime;

  var flightDestEl = document.createElement('p')
  flightDestEl.classList = 'title';
  flightDestEl.textContent = flights[0].destAirport;
  var arrivalIcon = document.createElement('i')
  arrivalIcon.classList = "fa-solid fa-plane-arrival";
	  
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


 flightOriginEl.appendChild(departureIcon);
 flightDestEl.appendChild(arrivalIcon);
// ]
}
startSearch();







