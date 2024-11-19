// Your OpenWeatherMap API key
const API_KEY = "";

// DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentLocBtn = document.getElementById("current-loc-btn");
const recentCitiesDropdown = document.getElementById("recent-cities");
const weatherInfo = document.getElementById("weather-info");
const forecastContainer = document.getElementById("forecast-container");
const errorMessage = document.createElement("p");
errorMessage.className = "text-red-500 text-sm mt-2";

// Add error message to the UI
function displayError(message) {
  errorMessage.textContent = message;
  if (!weatherInfo.contains(errorMessage)) {
    weatherInfo.appendChild(errorMessage);
  }
}

// Remove error message from the UI
function clearError() {
  if (weatherInfo.contains(errorMessage)) {
    weatherInfo.removeChild(errorMessage);
  }
}

// Fetch current weather by city name
async function fetchWeatherByCity(city) {
  clearError(); // Clear previous errors
  if (!city) {
    displayError("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found. Please check the city name.");
    const data = await response.json();
    updateCurrentWeather(data);
    saveRecentCity(city);
    fetchForecast(city);
  } catch (error) {
    displayError(error.message);
  }
}

// Fetch current weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  clearError(); // Clear previous errors
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Unable to fetch weather data for your location.");
    const data = await response.json();
    updateCurrentWeather(data);
    saveRecentCity(data.name);
    fetchForecast(data.name);
  } catch (error) {
    displayError(error.message);
  }
}

// Fetch 5-day forecast
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Unable to fetch the weather forecast.");
    const data = await response.json();
    updateForecast(data.list);
  } catch (error) {
    displayError(error.message);
  }
}

// Update current weather section
function updateCurrentWeather(data) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherInfo.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img src="${icon}" alt="${data.weather[0].description}" class="w-20 h-20">
        <div class="ml-4">
          <p class="text-2xl font-bold">${data.main.temp}°C</p>
          <p class="text-gray-600 capitalize">${data.weather[0].description}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-gray-600">Humidity: ${data.main.humidity}%</p>
        <p class="text-gray-600">Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    </div>
  `;
}

// Update 5-day forecast section
function updateForecast(list) {
  forecastContainer.innerHTML = ""; // Clear previous forecast
  const dailyData = list.filter((entry) => entry.dt_txt.includes("12:00:00"));
  dailyData.forEach((day) => {
    const date = new Date(day.dt_txt).toLocaleDateString();
    const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const temp = day.main.temp;
    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    const description = day.weather[0].description;

    const card = `
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="font-semibold">${date}</p>
        <img src="${icon}" alt="${description}" class="w-16 h-16 mx-auto">
        <p class="font-bold">${temp}°C</p>
        <p class="text-gray-600 capitalize">${description}</p>
        <p class="text-sm text-gray-600">Wind: ${wind} m/s</p>
        <p class="text-sm text-gray-600">Humidity: ${humidity}%</p>
      </div>
    `;
    forecastContainer.innerHTML += card;
  });
}

// Save recent city in dropdown
function saveRecentCity(city) {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    updateRecentCitiesDropdown(recentCities);
  }
}

// Load recent cities from local storage
function updateRecentCitiesDropdown(cities) {
  recentCitiesDropdown.innerHTML = '<option value="" disabled>Select a recent city</option>';
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    recentCitiesDropdown.appendChild(option);
  });
}

// Event: City search
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeatherByCity(city);
});

// Event: Current location search
currentLocBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        displayError("Unable to access your location!");
      }
    );
  } else {
    displayError("Geolocation is not supported by your browser.");
  }
});

// Event: Recent city selection
recentCitiesDropdown.addEventListener("change", (e) => {
  const city = e.target.value;
  if (city) fetchWeatherByCity(city);
});

// Load recent cities on page load
document.addEventListener("DOMContentLoaded", () => {
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  updateRecentCitiesDropdown(recentCities);
});
