'use strict'

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
            temp.innerHTML = "Actual Temperature: <strong>" + data.main.temp.toFixed(0) + "&#176;C</strong>";

            let details = document.getElementById("details")

            var options = {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: true
            };
            let upDate = new Date(data.dt * 1000);
            let upDate1 = Intl.DateTimeFormat('en-US', options).format(upDate);
            // let upDate = new Date(data.dt * 1000).toString();
            // let upDate1 = upDate.toLocaleString();

            details.innerHTML = `<p>High: <strong>${data.main.temp_max.toFixed(0)}&#176;C</strong>  |  Low: <strong>${data.main.temp_min.toFixed(0)}&#176;C</strong></p>`
            details.innerHTML += `<p>Humidity: <strong>${data.main.humidity}%</strong></p>`
            details.innerHTML += `<p>Condition: <strong>${data.weather[0].description}</strong></p>`
            details.innerHTML += `<p>Wind Speed: <strong>${data.wind.speed} KM/h</strong></p>`

            let latest = document.getElementById("latest");
            latest.textContent = `Updated: ${upDate1}`

        })
        .catch(err => console.log(err))
}