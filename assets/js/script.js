var APIKey = "84c3cfc8c419d24716f07138ab250bb5";
var forecastCityEl = document.querySelector('#forecast-city');
var cityNameEl = document.querySelector('#city');
var searchFormEl = document.querySelector('#search-form');
var currentCityEl = document.querySelector('#current-city');
var currentIconEl = document.querySelector('#icon');
var currentTempEl = document.querySelector('#temp');
var currentHumidityEl = document.querySelector('#humidity');
var currentWindEl = document.querySelector('#wind');
var forecastIconEl = document.querySelector('#iconF');
var forecastTempEl = document.querySelector('#tempF');
var forecastHumidityEl = document.querySelector('#humidityF');
var forecastWindEl = document.querySelector('#windF');



    

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = document.querySelector('#city').value.trim();
   
    
    if (city) {
        getCurrent(city);
        currentCityEl.textContent = '';
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
            var lat = data.coord.lat;
            console.log(lat);
            var lon = data.coord.lon;
            console.log(lon);
            getForecast(lat,lon);
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

var getForecast = function (lat,lon) {
  var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  console.log(queryURLforecast);

  fetch(queryURLforecast)
  .then(function (response) {
      if (response.ok) {
      response.json().then(function (data) {
          console.log(data);
          for (var i = 1; i < 6; i++) {
            var forecastIcon = document.createElement('p');
            var forecastTemp = document.createElement('p');
            var forecastHumidity = document.createElement('p');
            var forecastWind = document.createElement('p');

            forecastIcon.textContent = data.list[i].weather[0].icon;
            var forecastkelvin = data.list[i].main.temp;
            console.log(forecastkelvin);
            forecastkelvin = Math.floor(forecastkelvin);
            forecastTemp.textContent = forecastkelvin - 273;
            forecastHumidity.textContent = data.list[i].main.humidity;
            metersPerSecondSpeed = data.list[i].wind.speed;
            kilometersPerHourSpeed = metersPerSecondToKilometersPerHour(metersPerSecondSpeed);
            kilometersPerHourSpeed = Math.floor(kilometersPerHourSpeed);
            forecastWind.textContent = kilometersPerHourSpeed;

            forecastIconEl.append(forecastIcon);
            forecastTempEl.append(forecastTemp);
            forecastHumidityEl.append(forecastHumidity);
            forecastWindEl.append(forecastWind);
          }


        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};





searchFormEl.addEventListener('submit', formSubmitHandler);

function metersPerSecondToKilometersPerHour(metersPerSecond) {
  return metersPerSecond * 3.6;
}
