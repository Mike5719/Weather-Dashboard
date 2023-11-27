var APIKey = "84c3cfc8c419d24716f07138ab250bb5";


var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var city = document.querySelector('#search-input').value;
    console.log(city);
    
    if (!searchInputVal) {
        console.error('Please enter a valid city to search!');
    }

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    console.log(queryURL);

    location.assign(queryURL);
}


searchFormEl.addEventListener('submit', handdleSearchFormSubmit);