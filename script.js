import key from "./api.js";

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const temperature_min = document.querySelector('.temp-min');
const temperature_max = document.querySelector('.temp-max');
const feels_like = document.querySelector('.feels-like');

const summary = document.querySelector('.summary');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkPlace(city) {

    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${city}&language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };


    await fetch(url, options)
        .then(response => response.json())
        .then(place_data => {
            console.log(place_data);
            if (place_data.length == 0) {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                console.log("error");
                return;
            }
            return fetch(`https://ai-weather-by-meteosource.p.rapidapi.com/daily?place_id=${place_data[0].place_id}&language=en&units=auto`, options);
        })
        .then(response => {
            return response.json();
        })
        .then(weather_data => {
            console.log(weather_data);
            console.log(weather_data.daily.data[0].icon);

            checkWeather(weather_data);

        })
        .catch(error => {
            console.error(error);
        })


}


function checkWeather(weather_data) {

    console.log(weather_data.cod)
    console.log(weather_data.daily.data[0].icon);
    console.log(weather_data.daily.data[0].temperature_min);

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }


    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";


    temperature.innerHTML = `${weather_data.daily.data[0].temperature}`;
    temperature_min.innerHTML = `Minminum Temp: ${weather_data.daily.data[0].temperature_min}`;
    temperature_max.innerHTML = `Maximum Temp: ${weather_data.daily.data[0].temperature_max}`;
    feels_like.innerHTML = `Feels Like: ${weather_data.daily.data[0].feels_like}`;

    summary.innerHTML = `${weather_data.daily.data[0].summary}`;

    humidity.innerHTML = `${weather_data.daily.data[0].humidity}%`;
    wind_speed.innerHTML = `${weather_data.daily.data[0].wind.speed}Km/H`;


    switch (weather_data.daily.data[0].icon) {
        case 2:
        case 3:
            weather_img.src = "icons/sun.gif";
            break;
        case 4:
        case 5:
        case 6:
            weather_img.src = "icons/sun.png";
            break;
        case 7:
        case 8:
            weather_img.src = "icons/overcast.png"
            break;
        case 9:
            weather_img.src = "icons/foggy.gif"
            break;
        case 10:
        case 11:
        case 12:
            weather_img.src = "icons/umbrella.gif";
            break;
        case 13:
            weather_img.src = "icons/rain.gif"
            break;
        case 14:
        case 15:
            weather_img.src = "icons/storm.gif"
            break;
        case 16:
        case 17:
        case 18:
        case 19:
            weather_img.src = "icons/snow.png"
            break;
        case 20:
        case 21:
        case 22:
            weather_img.src = "icons/rain and snow.png"
            break;
        case 23:
        case 24:
            weather_img.src = "icons/freezing-rain.png"
            break;
        case 25:
            weather_img.src = "icons/hail.png"
            break;
        case 26:
            weather_img.src = "icons/night.gif"
            break;
        case 27:
        case 28:
        case 29:
        case 30:
            weather_img.src = "icons/cloudy-night.gif"
            break;
        case 31:
            weather_img.src = "icons/overcast-moon.png"
            break;
        case 32:
            weather_img.src = "icons/heavy-rain.png"
            break;
        case 33:
            weather_img.src = "icons/thunder.png";
            break;
        case 34:
        case 35:
            weather_img.src = "icons/snow-night.png";
            break;
        case 36:
            weather_img.src = "icons/heavy-snow.png";
            break;
    }
}


searchBtn.addEventListener('click', () => {
    console.log(4);
    checkPlace(inputBox.value);
});