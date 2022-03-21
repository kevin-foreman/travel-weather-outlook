var weatherContainerEl = document.querySelector("#weather-container");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search-term");
var cityButtonsEl = document.querySelector("#city-buttons");
var citySearchTermEl = document.querySelector("#city-term");


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

// feen the API into a variable we can pull later
// API data needs to be parsed with json to be read by the browser
function getCurrentWeather(city) {
    // format the OPEN WEATHER api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a6335987062d51ad7d8c2a8d96bc7cc";
    // make a request to the api's URL
    fetch(apiUrl).then(function(response) {
      // console.log(response);
      if (response.ok) {
        response.json().then(function(data) {
          // console.log(data.name);
          // displayWeather(data.name, city);
          // console.log(data);
          // console.log(data.name);
          getOneCall(data.coord);
          // displayWeather(data.name);
        });
      } else {
        alert("Error: " + response.statusText);
      };
    })
    .catch(function(error) {
    
      alert("Unable to connect to Open Weather");
    });
    
  };

  // Add One Call API function and pipe in the lat lon results from initial API fetch
  function getOneCall(coord, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +coord.lat + "&lon=" +coord.lon + "&units=imperial&appid=8a6335987062d51ad7d8c2a8d96bc7cc"
    fetch(apiUrl).then(function(response) {
      // console.log(response);
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
        displayWeather(data.current, city);
        // displayForecast(data.daily)
        });
      } else {
        alert("Error: " + response.statusText);
      };
    })
    .catch(function(error) {
    
      alert("Unable to connect to Open Weather");
    });
  };

  // build the function to call a 5 day forecast based on the data from the OneCall
  // OneCall API returns 7 days, but I only need 5, starting with the day after the current day
  // function displayForecast() {
  //   var forecastDayOne = moment(daily[1].dt*1000).format("MM-DD-YYYY");
  //   var forecastDayTwo = moment(daily[2].dt*1000).format("MM-DD-YYYY");
  //   var forecastDayThree = moment(daily[3].dt*1000).format("MM-DD-YYYY");
  //   var forecastDayFour = moment(daily[4].dt*1000).format("MM-DD-YYYY");
  //   var forecastDayFive = moment(daily[5].dt*1000).format("MM-DD-YYYY");



  // }

  // Display based on what the API returns

  // Add the response given by the API into a display type function
  // Display the information returned by the API
  function displayWeather(current, searchTerm) {

    if (current.length === 0) {
    weatherContainerEl.textContent = "No weather found.";
    return;
    };
    // console.log(main.name);

    citySearchTermEl.textContent = searchTerm;
    
    // create a container for each weather element
    var weatherEl = document.createElement("div");
    weatherEl.classlist = "list-item flex-row justify-space-between align-center";
    // console.log(weatherEl.classList);
    var cityName = searchTerm;
    // console.log(main.main.temp);
    // try creating a variable to contain the specific data point from the API response

    // temperature
    var temp = current.temp;
    var tempEl = document.createElement("p");
    tempEl.classList = "list-item flex-row justify-space-between align-center";
    // display the temperature and round to the nearest number to omit decimals
    tempEl.textContent = "Temp: " + Math.round(temp) + " F";
  

    // console.log(tempEl);

    var windEl = document.createElement("p");
    windEl.classList = "list-item flex-row justify-space-between align-center";
    windEl.textContent = "Wind: " + current.wind_speed + " mph";
    

    var humidityEl = document.createElement("p");
    humidityEl.classList = "list-item flex-row justify-space-between align-center";
    humidityEl.textContent = "Humidity: " + current.humidity + " %";
    

    var uvIndexEl = document.createElement("p");
    uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
    uvIndexEl.textContent = "UV Index: " + current.uvi;

     
    // create a span element to hold the name of the city
    var titleEl = document.createElement("span");
    titleEl.textContent = cityName;

    // Append items to the container
    weatherEl.appendChild(titleEl);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(windEl);
    weatherEl.appendChild(humidityEl);
    weatherEl.appendChild(uvIndexEl);

    // create an if else scenario to make the UV index change based on how high or low
    if (current.uvi <= 2) {
      var uvIndexEl = document.createElement("p");
      uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
      uvIndexEl.textContent = "UV Index: " + current.uvi + " (Favorable)";
      console.log(uvIndexEl.textContent);
      weatherEl.appendChild(uvIndexEl);
    } else if (current.uvi >= 3 || current.uvi <= 5)  {
      var uvIndexEl = document.createElement("p");
      uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
      uvIndexEl.textContent = "UV Index: " + current.uvi + " (Moderate)";
      console.log(uvIndexEl.textContent);
      weatherEl.appendChild(uvIndexEl);
    } else if (current.uvi >= 6 || current.uvi <= 7)  {
      var uvIndexEl = document.createElement("p");
      uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
      uvIndexEl.textContent = "UV Index: " + current.uvi + " (High)";
      console.log(uvIndexEl.textContent);
      weatherEl.appendChild(uvIndexEl);
    } else if (current.uvi >= 8 || current.uvi <= 10)  {
      var uvIndexEl = document.createElement("p");
      uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
      uvIndexEl.textContent = "UV Index: " + current.uvi + " (Very High)";
      console.log(uvIndexEl.textContent);
      weatherEl.appendChild(uvIndexEl);
    } else if (current.uvi >= 11)  {
      var uvIndexEl = document.createElement("p");
      uvIndexEl.classList = "list-item flex-row justify-space-between align-center";
      uvIndexEl.textContent = "UV Index: " + current.uvi + " (Extreme)";
      console.log(uvIndexEl.textContent);
      weatherEl.appendChild(uvIndexEl);
    }

    // Append container to the DOM
    weatherContainerEl.appendChild(weatherEl);
    };

  function getSearchedCity(city) {
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
  var city = event.target.getAttribute("data-city");
  // console.log(city);
  if (city) {
    // console.log(city);
    getCurrentWeather(city);
    weatherContainerEl.textContent = "";
  };
};

// Add a listener to the city search button
cityFormEl.addEventListener("submit", formSubmitHandler);

// add event listener to the pre-defined city buttons
// cityButtonsEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
