function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city-name");
  let weatherElement = document.querySelector("#weather");
  let windElement = document.querySelector("#wind");
  let humidElement = document.querySelector("#humid");
  console.log(response.data);

  //   let dateElement = formatDate(response.data.dt * 1000);
  //   console.log(dateElement);

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidElement.innerHTML = response.data.main.humidity;
}

let apiKey = "425bf19afa457ff7744c7e8ae8705a71";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
