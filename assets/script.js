var APIkey = "500a93d00042fdd6a229ad4c8e16ebbb"

var enterCityBtn = $("#city-button")
var searchForm = $("#search-form")
// var pastSeachBtn = $("#past-search-button")

function getCurrentDate(event) {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return currentDate.toLocaleDateString('en-UK', options);
}


function getForecast(lat,lon,name) {
var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    fetch(baseURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching forecast:', error));
}

function getWeather(lat,lon,name) {
    $("#today").empty()
    var baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
        fetch(baseURL)
        .then(response => response.json())
        .then(data=>{
            console.log("Data: ", data);
            var title = $("<h2>").text(name)
            var date = $("<p>").text(getCurrentDate());
            var temp = $("<h3>").text("Temp: "+data.main.temp+ "°C")
            var humidity = $("<h3>").text("Humidity: "+data.main.humidity+ "%")
            var wind = $("<h3>").text("Wind: "+data.wind.speed+ "KPH")
            var icon = $("<img>").attr("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            $("#today").append(title.append(icon),date,temp,humidity,wind)
        //     //get 5 day forecast and append to the fiveDay div
        //     var fiveday = $('<div class="row">').attr({'class':'five-day','id': 'fiveday'
        //     }).addClass('container')
        //     $('#today').after(date,fiveday)
        //     for (i=0; i < 5 ; i++) {
        //         var col = $('<div>').attr({'class':'col-md-2'})
        //         var d = data.list[i*8+1]
        //         var card = createCard(d)
        //         col.append(card)
        //         $('#fiveday').append(col)
        //         }                
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