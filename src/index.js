function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let hr = date.getHours();
  if (hr < 10) {
    hr = `0${hr}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let dayArray = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let dayofweek = dayArray[day];

  return { dayofweek, hr, min };
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city-name");
  let weatherElement = document.querySelector("#weather");
  let windElement = document.querySelector("#wind");
  let humidElement = document.querySelector("#humid");
  let dayElement = document.querySelector("#day");
  let hourElement = document.querySelector("#hour");
  let minElement = document.querySelector("#min");
  let iconElement = document.querySelector("#mainimg");
  console.log(response.data);

  celTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  weatherElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidElement.innerHTML = response.data.main.humidity;
  dayElement.innerHTML = formatDate(response.data.dt * 1000).dayofweek;
  hourElement.innerHTML = formatDate(response.data.dt * 1000).hr;
  minElement.innerHTML = formatDate(response.data.dt * 1000).min;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "425bf19afa457ff7744c7e8ae8705a71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  celLink.classList.add("active");
  fahLink.classList.remove("active");
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-input");
  searchCity(cityInput.value);
}

function displayCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celTemp);
}

function displayFahTemp(event) {
  event.preventDefault();
  fahLink.classList.add("active");
  celLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celTemp * 1.8 + 32);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let celTemp = null;

let celLink = document.querySelector(".cel-degree");
celLink.addEventListener("click", displayCelTemp);

let fahLink = document.querySelector(".fah-degree");
fahLink.addEventListener("click", displayFahTemp);

searchCity("hong kong");
