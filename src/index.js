function showCity(data) {
    document.querySelector(
        "#city"
    ).innerHTML = `${data.name}, ${data.sys.country}`;
}

function showTemperature(data) {
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp);
}

function showWeather(data) {
    document.querySelector("#weather-description").innerHTML =
        data.weather[0].description;
    document.querySelector(
        ".weather-icon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function getLocationWeather(query) {
    let apiKey = "625a5eef04eaab6d1d3e9fc3d77578c3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(function (response) {
        console.log(response.data);
        showCity(response.data);
        showTemperature(response.data);
        showWeather(response.data);
    });
}

document.querySelector("#by-location").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        getLocationWeather(
            `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
    });
});
document.querySelector("#search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let city = this.querySelector("#city-input").value;
    getLocationWeather(`q=${city}`);
});
