const apikey = "bf26c862bce605f2ecae1366f53220cf";
let city = "burwood";
const wthDec = document.getElementById("wth");
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

const fetchWeather = async () => {
  try {
    const response = await fetch(urlWeather);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.log("Error:", error);
  }
};

fetchWeather();

const displayWeather = (data) => {
  if (data && data.name) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { icon } = data.weather[0];

    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;



    let str = `
      <h2 class="city">Weather in ${name}</h2>
      <h1 class="temp">${temp}&deg;C</h1>
      <img src="${iconUrl}" alt="" class="icon">
      <div class="description">Cloudy</div>
      <div class="humidity">Humidity: ${humidity}%</div>
      <div class="wind">Wind speed: ${speed} km/h</div>
    
    `;

    wthDec.innerHTML = str;
  }
  else {
    wthDec.innerHTML = "<p>City not found.</p>";
  }
};

const search = () => {
  const searchBar = document.querySelector(".search-bar");
  city = searchBar.value;
  urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  fetchWeather();
};

document.querySelector(".search button").addEventListener("click", search);

document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
