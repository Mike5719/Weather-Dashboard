var APIKey = "84c3cfc8c419d24716f07138ab250bb5";
var forecastContainerEl = document.querySelector('#forecast-container');
var cityNameEl = document.querySelector('#city');
var searchFormEl = document.querySelector('#search-form');
var currentContainerEl = document.querySelector('#current-container');
var currentIconEl = document.querySelector('#icon');
var currentTempEl = document.querySelector('#temp');
var currentHumidityEl = document.querySelector('#humidity');
var currentWindEl = document.querySelector('#wind');




    

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = document.querySelector('#city').value.trim();
    // console.log(city);
    // console.log(queryURL);
    
    if (city) {
        getCurrent(city);
        forecastContainerEl.textContent = '';
        cityNameEl.value = '';
    } else {
        alert('Please enter a valid city name');
    }

};

var getCurrent = function (city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            displayCurrent(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };
    
function displayCurrent(currentData)
{    
currentContainerEl.textContent = currentData.name
var today = dayjs().format('MMMM D, YYYY');
$('#date').text(today);
currentIconEl.textContent = currentData.icon.value
currentTempEl.textContent = currentData.main.temp
currentHumidityEl.textContent = currentData

}





searchFormEl.addEventListener('submit', formSubmitHandler);