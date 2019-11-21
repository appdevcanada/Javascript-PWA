document.addEventListener("DOMContentLoaded", init)

function init() {
    loadData();
}

function loadData() {
    // 911d2b208fdecabbb1a301fae07ed399
    // 2d46092cb1d1df56a99dc89cffe08968
    let url = "https://api.openweathermap.org/data/2.5/weather?id=6094817&units=metric&APPID=2d46092cb1d1df56a99dc89cffe08968"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let city = document.getElementById("city");
            city.textContent = "City: " + data.name;

            let temp = document.getElementById("temp");
            temp.innerHTML = "Actual Temperature: " + data.main.temp.toFixed(0) + "&#176;C";

            let details = document.getElementById("details")

            let upDate = new Date(data.dt * 1000);
            let upDate1 = upDate.toLocaleString();

            details.innerHTML = `<p>High: ${data.main.temp_max.toFixed(0)}&#176;C  |  Low: ${data.main.temp_min.toFixed(0)}&#176;C</p>`
            details.innerHTML += `<p>Humidity: ${data.main.humidity}%</p>`
            details.innerHTML += `<p>Condition: ${data.weather[0].description}</p>`
            details.innerHTML += `<p>Wind Speed: ${data.wind.speed} KM/h</p>`

            let latest = document.getElementById("latest");
            latest.textContent = `${upDate1}`

        })
        .catch(err => console.log(err))
}