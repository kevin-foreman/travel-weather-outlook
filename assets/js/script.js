function getDenverWeather() {
    // format the OPEN WEATHER api url
    var apiUrl = "OPEN WEATHER API";
  
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data, user);
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

  function getCurrentWeather() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1586468027&appid={API key}";
  
    fetch(apiUrl);
  };