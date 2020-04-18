"use strict";

window.displayWeather = function (data) {
    var place = document.createElement("div");
    var temperature = document.createElement("div");
    var weather = document.createElement("div");
    var button = document.createElement("button");
    var buttonText = document.createTextNode("Change Temperature unit");
    var image = document.createElement("img");
    place.setAttribute("class", "place");
    temperature.setAttribute("class", "temperature");
    temperature.setAttribute("id", "temperature");
    weather.setAttribute("class", "weather");
    place.textContent = data.city_name;
    temperature.textContent = data.temp + " C";
    weather.textContent = data.weather.description;
    image.setAttribute("src", "icons/" + data.weather.icon + ".png");
    image.setAttribute("alt", "weather image");
    button.appendChild(buttonText);
    button.addEventListener("click", function () {
        var temp = document.getElementById("temperature");
        var float = parseFloat(temp.textContent.substr(0, temp.textContent.length - 2));
        console.log(float);
        if (temp.textContent[temp.textContent.length - 1] == 'C') {
            float = float * (9 / 5) + 32;
            float = float.toPrecision(3);
            temp.textContent = float.toString() + " F";
        } else {
            float = (float - 32) * (5 / 9);
            float = float.toPrecision(3);
            temp.textContent = float.toString() + " C";
        }
    });

    document.body.appendChild(place);
    document.body.appendChild(temperature);
    document.body.appendChild(weather);
    document.body.appendChild(image);
    document.body.appendChild(button);
};
window.fetchData = function (latitude, longitude) {
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=" + longitude + "&lat=" + latitude, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": "27632a4321mshed8c3f7b8c8cfd9p120a95jsnd1f289e9e657"
        }
    }).then(function (res) {
        return res.json().then(function (res) {
            console.log(res);
            displayWeather(res.data[0]);
        });
    }).catch(function (err) {
        console.log(err);
    });
};
window.onload = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetchData(position.coords.latitude, position.coords.longitude);
        }, function (err) {
            console.log(err);
        });
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
};