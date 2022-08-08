function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekdays[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let searchForm = document.querySelector("#search-form");
let currentLocation = document.querySelector("#current-location");
let celsiusTemp = null;
let temp = document.querySelector("#temperature-number");
let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
let weatherIcon = document.querySelector("#weather-icon");
let cityInput = document.querySelector("#city-input");

function getForecast(coordinates) {
  let apiKey = "d4996adfc0c3206b46891c9a2623b3a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 day-forecast">
          <div><h5>${formatDay(forecastDay.dt)}</h5></div> 
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="forecast-icon" id="forecast-icon" alt="${
          forecastDay.weather[0].description
        }">
          <div>
            <span id="forecast-temp-max" class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}/</span><span id="forecast-temp-min" class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}</span>
          </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("#temperature-number").innerHTML =
    Math.round(fahrenheitTemp);
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed * 0.621
  );
  document.querySelector("h4").innerHTML =
    "Last updated " + formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  cityInput.value = "";
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "d4996adfc0c3206b46891c9a2623b3a9";
  let apiUrlFahrenheit = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlFahrenheit).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = cityInput.value;
  searchCity(city);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d4996adfc0c3206b46891c9a2623b3a9";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlCurrent).then(displayWeather);
}

function runCurrent() {
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}

function displayFahrenheit(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}
function displayCelsius(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

formatDate();
searchCity("San Francisco");
searchForm.addEventListener("submit", handleSubmit);
currentLocation.addEventListener("click", runCurrent);
fahrenheit.addEventListener("click", displayFahrenheit);
celsius.addEventListener("click", displayCelsius);
