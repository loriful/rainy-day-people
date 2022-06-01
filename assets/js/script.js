var getCityFormEl = document.querySelector("#city-form");
var cityButtonsEl = document.querySelector("#city-btn");
var cityInputEl = document.querySelector("#city");

var cityContainerEl = document.querySelector("#city-container");

var cityList = [];

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var citySearch = cityInputEl.value.trim();

  if (citySearch) {
    getWeather(citySearch);

    // clear old content
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var buttonClickHandler = function(event) {
  // get the city from the clicked element
  var cityButton = event.target.getAttribute("city-name");

  if (cityButton) {
    getWeather(cityButton);
    };
};  // buttonClickHandler

var getWeather = function(city) {
    
    var mykey = "11b520b3cde6c648473edd6d9f0165e9";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + city + "&appid=" + mykey;
  
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log('this is the response' + JSON.stringify(response));
                response.json().then(function(data) {
                console.log(data);
                displayWeather(data);
                });
            } else {
                alert('Error: ' + city + ' not in weather in database');
            }
            })
        .catch(function(error) {
             alert("Unable to connect to weather outlet");
        });
}; // getWeather


var displayWeather = function(weather) {
    // check if api returned any data
    if (weather.length === 0) {
        cityContainerEl.textContent = "No weather found.";
        return;
    }

         // city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
      
    var weatherCityEl = document.createElement("h3");
    weatherCityEl.innerHTML = "<h3>" + weather.name + "</h3>";
    document.querySelector("#city-container").appendChild(weatherCityEl);

    var weatherDataEl = document.createElement("li");
    var temp = (weather.main.temp/4);
    temp = Math.round(temp);
    weatherDataEl.innerHTML = "Temp: " + (temp);
    document.querySelector("#city-container").appendChild(weatherDataEl);
    
    if (!cityList.includes(weather.name)) {
        cityList.unshift(weather.name);
        cityList.pop();
    };

    console.log('city list array ' + cityList);
    storeWeather();
    makeButtons();
    
    
};  // displayWeather

  var makeButtons = function() {

    // keep city buttons to 6
    // document.querySelector("#button-container").remove();

    // var handle = document.createElement("div");
    // handle.innerhtml = "id=button-container class=card-body";
    // document.querySelector("#button-handle").appendChild(handle);

    for (var i = 0; i < cityList.length; i++) {
        // create a button for each city
        var cityEl = document.createElement("li");
        cityEl.innerHTML = "<button class=btn id=city-btn type=button value=" + cityList[i] + ">" + cityList[i] + "</button>";
    
        // append to container
        document.querySelector("#button-container").appendChild(cityEl);
    }
    getCityFormEl.addEventListener("submit", formSubmitHandler);
    // cityButtonsEl.addEventListener("click", buttonClickHandler);

}; // makeButtons

function storeWeather () {

    var storeData = JSON.stringify(cityList);

    if (localStorage.getItem("savedWeather")) {        
        localStorage.clear("savedWeather");
    }
    localStorage.setItem("savedWeather", storeData);
  
};  // end function storeWeather

///////////////////////////////////////////////////
// add event listeners to form and button container

if (localStorage.getItem("savedWeather")) {         
    var cityList = JSON.parse(localStorage.getItem("savedWeather"));
} else {
    var cityList = ["San Francisco", "New York", "Chicago", "Miami", "Dallas", "Atlanta"];
}

makeButtons();
