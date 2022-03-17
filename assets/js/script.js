var weatherContainerEl = document.querySelector("#weather-container");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search-term");
var cityButtonsEl = document.querySelector("#city-buttons");
var citySearchTerm = document.querySelector("#city-search-term");
var citySearchTermEl = document.querySelector("#city-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getCurrentWeather(city);

    // clear old content
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  };
};

function getCurrentWeather(city) {
    // format the OPEN WEATHER api url
       var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q" + city + ",us&appid=8a6335987062d51ad7d8c2a8d96bc7cc";;
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?qlondon&appid=8a6335987062d51ad7d8c2a8d96bc7cc"
    // make a request to the api's URL
    fetch(apiUrl).then(function(response) {
      
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data, city);
        });
      } else {
        alert('Error: City not found');
      };
    });
    .catch(function(error) {
     
      alert("Unable to connect to Open Weather");
    });
  };

  // getCurrentWeather();



  function displayWeather(weather, searchTerm) {

    // Clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    if (weather.length === 0) {
    weatherContainerEl.textContent = "No weather found.";
    return;
    };
    
    weatherSearchTerm.textContent = searchTerm;

    var tempEl = document.createElement("a");
    tempEl.classList = "list-item flex-row";
    
    var windEl = document.createElement("a");
    windEl.classlist = "list-item flex-row";

    var humidityEl = document.createElement("a");
    humidityEl.classlist = "list-item flex-row";

    var uvIndexEl = document.createElement("a");
    uvIndexEl.classlist = "list-item flex-row";


  };

  function getSearchedWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";
    fetch(apiUrl).then(function() {
    if (response.ok) {
      response.json().then(function(data) {
        displayWeather(data.items, city)
      });
    } else {
      alert("error: Weather not found");
    };
  });
  };

  // button click handler
function buttonClickHandler() {
  let city = event.target.getAttribute("data-city");
  console.log(city);
  if (city) {
    getSearchedWeather(city);

    weatherContainerEl.textContent = "";
  };
};


cityButtonsEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
