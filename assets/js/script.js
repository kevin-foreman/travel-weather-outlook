var weatherContainerEl = document.querySelector("#weather-container");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search-term");
var cityButtonsEl = document.querySelector("#city-buttons");
var citySearchTerm = document.querySelector("#city-search-term");
var citySearchTermEl = document.querySelector("#city-search-term");


// take input from a user to search for a city inside the form
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";;
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?qlondon&appid=8a6335987062d51ad7d8c2a8d96bc7cc"
    // make a request to the api's URL
    fetch(apiUrl).then(function(response) {
      // console.log(response);
      if (response.ok) {
        response.json().then(function(data) {
          // console.log(data.name);
          displayWeather(data.name, city);
          console.log(data);
          displayWeather(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      };
    })
    .catch(function(error) {
    
      alert("Unable to connect to Open Weather");
    });
  };

  // getCurrentWeather();


  // Display the information returned by the API
  function displayWeather(main, searchTerm) {

    // Clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    if (main.length === 0) {
    weatherContainerEl.textContent = "No weather found.";
    return;
    };
    
    // weatherSearchTerm.textContent = searchTerm;

    // loop over weather data
    for (var i = 0; i <main.length; i++) {
    var cityName = main[i].name;


    // create a container for each weather element
    var weatherEl = document.createElement("div");
    weatherEl.classlist = "list-item flex-row justify-space-between align-center";
    weatherEl.setAttribute("textContent", cityName);

    var tempEl = document.createElement("p");
    tempEl.classList = "list-item flex-row justify-space-between align-center";

    var windEl = document.createElement("p");
    windEl.classlist = "list-item flex-row justify-space-between align-center";

    var humidityEl = document.createElement("p");
    humidityEl.classlist = "list-item flex-row justify-space-between align-center";

    var uvIndexEl = document.createElement("p");
    uvIndexEl.classlist = "list-item flex-row justify-space-between align-center";
    
    // create a span element to hold the name of the city
    var titleEl = document.createElement("span");
    titleEl.textContent = cityName;

    // Append items to the container
    weatherEl.appendChild(titleEl);

    // Append container to the DOM
    weatherContainerEl.appendChild(weatherEl);
    };
  };

  function getSearchedWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";
    fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayWeather(data.main, city)
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

// Add a listener to the city search button
cityFormEl.addEventListener("submit", formSubmitHandler);

// add event listener to the pre-defined city buttons
cityButtonsEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
