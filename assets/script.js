var APIkey = "500a93d00042fdd6a229ad4c8e16ebbb"

var enterCityBtn = $("#city-button")
var searchBtn = $("#search-button")
// var pastSeachBtn = $("#past-search-button")

var cityInput;

function getWeather(data) {
var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}`
    fetch(baseURL)
    .then(response => response.json())
}

function displaySearchHistory() {
    // Get the history from local storage and parse it into an array of objects
    
}

function getLocation() {
    
}

function pastCity() {

}

function clearHistory() {

}



displaySearchHistory();

searchBtn.on("click", handleCityFormSubmit);

clearBtn.on("click", handleClearHistory);

pastSearchedCitiesEl.on("click", getPastCity);