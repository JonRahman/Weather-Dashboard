var APIkey = "500a93d00042fdd6a229ad4c8e16ebbb"

var enterCityBtn = $("#city-button")
var searchForm = $("#search-form")
// var pastSeachBtn = $("#past-search-button")


function getForecast(lat,lon,name) {
var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    fetch(baseURL)
    .then(response => response.json())
    .then(data=>console.log(data))
}

function getWeather(lat,lon,name) {
    $("#today").empty()
    var baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
        fetch(baseURL)
        .then(response => response.json())
        .then(data=>{
            console.log("Data: ", data);
            var title = $("<h2>").text(name)
            var temp = $("<h3>").text("temp: "+data.main.temp)
            var humidity = $("<h3>").text("humidity: "+data.main.humidity)
            var wind = $("<h3>").text("wind: "+data.wind.speed)
            var icon = $("<img>").attr("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            $("#today").append(title.append(icon),temp,humidity,wind)
        })
    }

function handleCityFormSubmit(event) {
    event.preventDefault()
    var cityInput = $('#search-input').val().trim();
    getLocation(cityInput)
}




function displaySearchHistory() {
    // Get the history from local storage and parse it into an array of objects
    
}

function getLocation(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+APIkey).then(response => response.json()).then(data=>{
        var lat= data[0].lat;
        var lon= data[0].lon;
        var cityName = data[0].name;
        getWeather(lat,lon,cityName)
    })
}

function pastCity() {

}

function clearHistory() {

}



//displaySearchHistory();

searchForm.on("submit", handleCityFormSubmit);

//clearBtn.on("click", handleClearHistory);

//pastSearchedCitiesEl.on("click", getPastCity);