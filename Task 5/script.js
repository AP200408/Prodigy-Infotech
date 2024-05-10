function fetchWeather(location) {
  const apiKey = "8039e8869678237d108cca9c1315953e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

  if (location) {
    apiUrl += `&q=${location}`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.log("Error fetching weather:", error));
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherDiv.innerHTML = `
        <div>
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${imageUrl}" alt="Weather Icon">
            <p>Weather: ${data.weather[0].main}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

document
  .getElementById("location-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const location = document.getElementById("location").value;
    fetchWeather(location);
  });

document
  .getElementById("current-location-btn")
  .addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });

function fetchWeatherByCoordinates(latitude, longitude) {
  const apiKey = "8039e8869678237d108cca9c1315953e";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.log("Error fetching weather:", error));
}
