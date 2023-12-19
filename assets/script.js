var APIkey = "500a93d00042fdd6a229ad4c8e16ebbb"

var enterCityBtn = $("#city-button")
var searchForm = $("#search-form")
var pastCity = $("#past-search-button")

function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return currentDate.toLocaleDateString('en-UK', options);
}

function getForecast(lat, lon) {
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    
    fetch(forecastURL)
      .then(response => response.json())
      .then(data => {
        console.log("Forecast Data: ", data);
  
        // Display the 5-day forecast
        displayForecast(data.list);
      })
      .catch(error => {
        console.error("Error fetching forecast data:", error);
      });
  }


function getWeather(lat,lon,name) {
    $("#today").empty()
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
        fetch(weatherURL)
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

            // Call getForecast after fetching current weather data
      getForecast(lat, lon);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    
        })
    }

function handleCityFormSubmit(event) {
    event.preventDefault()
    var cityInput = $('#search-input').val().trim();
    getLocation(cityInput)
}

function WeatherCards() {
    var weatherWURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
    fetch(weatherWURL)
    .then(response => response.json())
    .then(data=>console.log(data))
}

function displaySearchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var pastSearchesEl = document.getElementById('past-searches');

    pastSearchesEl.innerHTML ='';

    for (i = 0; i < storedCities.length; i++) {
        
        var pastCityBtn = document.createElement("button");
        pastCityBtn.classList.add("btn", "btn-primary", "my-2", "past-city");
        pastCityBtn.setAttribute("style", "width: 100%");
        pastCityBtn.textContent = `${storedCities[i].city}`;
        pastSearchesEl.appendChild(pastCityBtn);
    }
    return;
}

function getLocation(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+APIkey).then(response => response.json()).then(data=>{
        var lat= data[0].lat;
        var lon= data[0].lon;
        var cityName = data[0].name;
        storeCity(cityName);
        getWeather(lat,lon,cityName)
    })
}

function displayForecast(forecastList) {
    
    for (let i = 0; i < 5; i++) {
      const forecastData = forecastList[i];
      
      const dateElement = $(`#Date${i + 1}`);
      const tempElement = $(`#Temp${i + 1}`);
      const windElement = $(`#Wind${i + 1}`);
      const humidityElement = $(`#Humidity${i + 1}`);
      const iconElement = $(`#Icon${i + 1}`);
  
      dateElement.text(dayjs(forecastData.dt_txt).format('MMMM DD, YYYY'));
      tempElement.text(`Temperature: ${forecastData.main.temp} °C`);
      windElement.text(`Wind: ${forecastData.wind.speed} KPH`);
      humidityElement.text(`Humidity: ${forecastData.main.humidity}%`);
      iconElement.attr("src", `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`);
    }
  }

function pastCity() {

}

function clearHistory() {

}

function storeCity(city) {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var cityExists = storedCities.some(storedCity => storedCity.city === city);

    if (!cityExists) {
        storedCities.push({city: city});
        localStorage.setItem("cities", JSON.stringify(storedCities));
    }
}



//displaySearchHistory();

searchForm.on("submit", handleCityFormSubmit);

//clearBtn.on("click", handleClearHistory);

//pastSearchedCitiesEl.on("click", getPastCity);