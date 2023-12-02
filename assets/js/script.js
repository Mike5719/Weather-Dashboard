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
var forecastContainerEl = document.querySelector('#forecastContainer');



    

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
          for (var i = 0; i < data.list.length; i+=5) {
            // if (i>20) {
            //   continue
            // }
            var forecastEl = document.createElement('div');
            forecastEl.setAttribute("class", "forecastcard");
            //forecastcard date
            var forecastDateEl = document.createElement('p');
            forecastDateEl.textContent = `Date: ${data.list[i].dt_txt}`;
            //forecastcard icon
            var forecastIconURL = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            var forecastIconEl =document.createElement('img');
            forecastIconEl.setAttribute("class", "forecastIcon");
            forecastIconEl.setAttribute("src", forecastIconURL);
            //temperature
            var forecastTempEl = document.createElement('p');
            var forecastkelvin = data.list[i].main.temp;
            forecastkelvin = Math.floor(forecastkelvin);
            forecastTempEl.textContent = `Temperature: ${forecastkelvin - 273} \u00B0 C`;
           
            //humidity
            var forecastHumidityEl = document.createElement('p');
            forecastHumidityEl.textContent = `Humidity: ${data.list[i].main.humidity} %`;
            //wind speed
            var forecastWindEl = document.createElement('p');
            var metersPerSecondSpeed = data.list[i].wind.speed;
            var kilometersPerHourSpeed = Math.floor(metersPerSecondToKilometersPerHour(metersPerSecondSpeed));

            forecastWindEl.textContent = `Wind Speed: ${kilometersPerHourSpeed} km/h`;
            //append forecast elements to card
            forecastEl.append(forecastDateEl, forecastIconEl, forecastTempEl, forecastHumidityEl, forecastWindEl);
            //append card to container
            forecastContainerEl.append(forecastEl);
           
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
