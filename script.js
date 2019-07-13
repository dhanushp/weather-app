let appId = '9b4506d79c5224eee74cad33847b529e';
let units = 'metric';
let searchMethod;


function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod = 'q';         
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
     return result.json();   
    }).then(result => {
        init(result);
    })
}
function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("Images/Clear.jpg")';
            break;
        
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("Images/Cloudy.jpg")';
            break;
        

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("Images/Rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("Images/Storm.jpg")';
            break;  


        case 'Snow':
            document.body.style.backgroundImage = 'url("Images/Snow.jpg")';
            break;

    
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    
    let resultDesciption = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);
    
    temperatureElement.innerHTML = "Temperature is " + Math.floor(resultFromServer.main.temp) + '&#176' + 'c';

    windSpeedElement.innerHTML = 'Wind at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';

    cityHeader.innerHTML = resultFromServer.name;

    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

document.getElementById('searchBtn').addEventListener('click',() => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})