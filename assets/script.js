var APIkey = ""

var enterCityBtn = $("#city-button")
var searchBtn = $("#search-button")
var pastSeachBtn = $("#past-search-button")

function getWeather(data) {
var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}`
    fetch(baseURL)
    .then(response => response.json())
}

