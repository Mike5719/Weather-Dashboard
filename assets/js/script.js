var APIKey = "84c3cfc8c419d24716f07138ab250bb5";
var forecastContainerEl = document.querySelector('#forecast-container');
var cityNameEl = document.querySelector('#city');
var searchFormEl = document.querySelector('#search-form');
var currentCityEl = document.querySelector('#current-city');
var currentIconEl = document.querySelector('#icon');
var currentTempEl = document.querySelector('#temp');
var currentHumidityEl = document.querySelector('#humidity');
var currentWindEl = document.querySelector('#wind');




    

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = document.querySelector('#city').value.trim();
   
    
    if (city) {
        getCurrent(city);
        forecastContainerEl.textContent = '';
        cityNameEl.value = '';
    } else {
        alert('Please enter a valid city name');
    }

};

var getCurrent = function (city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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
  
currentCityEl.textContent = 'City: ' + currentData.name
var today = dayjs().format('MMMM D, YYYY');
$('#date').text(today);
var kelvin = currentData.main.temp;
kelvin = Math.floor(kelvin);
console.log(kelvin);
currentTempEl.textContent = kelvin - 273;
console.log(currentTempEl);
var metersPerSecondSpeed = currentData.wind.speed;
var kilometersPerHourSpeed = metersPerSecondToKilometersPerHour(metersPerSecondSpeed);
kilometersPerHourSpeed = Math.floor(kilometersPerHourSpeed);
console.log(kilometersPerHourSpeed);
currentWindEl.textContent = kilometersPerHourSpeed + ' km/h'
currentIconEl.textContent = currentData.weather[0].icon
currentHumidityEl.textContent= currentData.main.humidity + '%'


}



searchFormEl.addEventListener('submit', formSubmitHandler);

function metersPerSecondToKilometersPerHour(metersPerSecond) {
  return metersPerSecond * 3.6;
}
