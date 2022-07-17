let now = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
function time() {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day} ${hour}:${minute}`;
}

let searchForm = document.querySelector("#search-form");
let currentLocation = document.querySelector("#current-location");

function displayWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
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

time();
searchCity("Oakland");
searchForm.addEventListener("submit", handleSubmit);
currentLocation.addEventListener("click", runCurrent);
