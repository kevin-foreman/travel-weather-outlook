var weatherContainerEl = document.querySelector("#current-weather");
var citySearchEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-search");
var cityButtonsEl = document.querySelector("#city-buttons");
var citySearchTermEl = document.querySelector("#city-search-term")


var cityButtonsEl = document.querySelector("#city-buttons");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var citysearch = cityInputEl.value.trim();

  if (citysearch) {
    getCityWeather(citysearch);

    // clear old content
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

function getCityWeather(city) {
    // format the OPEN WEATHER api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";;
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data.items, city);
        });
      } else {
        alert('Error: City not found');
      }
    })
    .catch(function(error) {
      // `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to Open Weather");
    });
  };

  function getCurrentWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";
  
    fetch(apiUrl);
  };

  function displayWeather(weather, searchTerm) {
    weatherSearchTerm.textContent = searchTerm;

    var tempEl = document.createElement("a");
    tempEl.classList = "list-item flex-row";
    
    var windEl = document.createElement("a");
    windEl.classlist = "list-item flex-row";

    var humidityEl = document.createElement("a");
    humidityEl.classlist = "list-item flex-row";

    var uvIndexEl = document.createElement("a");
    uvIndexEl.classlist = "list-item flex-row";


  }

  

  // button click handler
function buttonClickHandler() {
  let language = event.target.getAttribute("data-city");
  console.log(city);
  if (city) {
    getCurrentWeather(city);

    weatherContainerEl.textContent = "";
  }
};


cityButtonsEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
