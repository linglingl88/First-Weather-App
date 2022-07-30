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

function displayWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature-number").innerHTML =
    Math.round(celsiusTemp);
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  document.querySelector("h3").innerHTML =
    "Last updated " + formatDate(response.data.dt * 1000);
}

function searchCity(city) {
  let apiKey = "d4996adfc0c3206b46891c9a2623b3a9";
  let apiUrlCelsius = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCelsius).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d4996adfc0c3206b46891c9a2623b3a9";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayWeather);
}

function runCurrent() {
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}

let temp = document.querySelector("#temperature-number");
let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
function displayFahrenheit(event) {
  event.preventDefault();
  temp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}
function displayCelsius(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

formatDate();
searchCity("Oakland");
searchForm.addEventListener("submit", handleSubmit);
currentLocation.addEventListener("click", runCurrent);
fahrenheit.addEventListener("click", displayFahrenheit);
celsius.addEventListener("click", displayCelsius);
