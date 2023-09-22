var weatherApiKey = '249506049aa732c8bd69f2c5fc992d9f';
var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
var searchBtn = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar');
var h3El = document.querySelector('#city-title');
var windPEl = document.querySelector('#wind');
var tempPEl = document.querySelector('#temp');
var humidityPEl = document.querySelector('#humidity');
var fiveDayForecastEl = document.querySelector('#five-cards');




function currentWeather(city) {
    
    var catURL = weatherApiUrl + city + `&appid=${weatherApiKey}&units=imperial`;
    fetch(catURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var WeatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
            var cityName = data.name;
            console.log(cityName);
            h3El.textContent = cityName + dayjs().format(' (M/D/YYYY)') + WeatherIcon;
            var windMPH = data.wind.speed;
            windPEl.textContent = 'Wind: ' + Math.floor(windMPH);
            console.log(data);
            var cityTemp = data.main.temp
            tempPEl.textContent = 'Temp: ' + Math.floor(cityTemp);
            var cityHumidity = data.main.humidity;
            humidityPEl.textContent = 'Humidity: ' + Math.floor(cityHumidity) + '%';
            var cityLat = data.coord.lat
            var cityLon = data.coord.lon
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${weatherApiKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    for (var i = 0; i < data.list.length; i = i + 8) {
                        var card1 = document.createElement('h5')
                        card1.setAttribute('class', 'card col-2', 'style', 'width: 18rem')
                        card1.textContent = dayjs(data.list[i + 1].dt_txt).format('(M/D/YYYY)')
                        fiveDayForecastEl.appendChild(card1);
                        var card2 = document.createElement('p')
                        card2.textContent = 'Temp: ' + Math.floor(data.list[i].main.temp);
                        card1.appendChild(card2);
                        var card3 = document.createElement('p')
                        card3.textContent = 'Wind: ' + Math.floor(data.list[i].wind.speed);
                        card1.appendChild(card3);
                        var card4 = document.createElement('p')
                        card4.textContent = 'Humidity: ' + Math.floor(data.list[i].main.humidity);
                        card1.appendChild(card4);



                        console.log(data.list[i])
                    }
                    console.log(data);
                })
        })
}






searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBar.value;
    currentWeather(city);

});



var ex1 = {
    "dt": 1695427200,
    "main": {
        "temp": 67.01,
        "feels_like": 66.51,
        "temp_min": 63.45,
        "temp_max": 67.01,
        "pressure": 1022,
        "sea_level": 1022,
        "grnd_level": 1004,
        "humidity": 66,
        "temp_kf": 1.98
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "clouds": {
        "all": 83
    },
    "wind": {
        "speed": 12.39,
        "deg": 66,
        "gust": 22.75
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
        "pod": "n"
    },
    "dt_txt": "2023-09-23 00:00:00"
}











// var ex = {
//     "coord": {
//         "lon": -0.1257,
//         "lat": 51.5085
//     },
//     "weather": [
//         {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 55,
//         "feels_like": 54.19,
//         "temp_min": 51.04,
//         "temp_max": 57.99,
//         "pressure": 1004,
//         "humidity": 85
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 1.01,
//         "deg": 227,
//         "gust": 1.99
//     },
//     "clouds": {
//         "all": 27
//     },
//     "dt": 1695409979,
//     "sys": {
//         "type": 2,
//         "id": 2075535,
//         "country": "GB",
//         "sunrise": 1695361553,
//         "sunset": 1695405658
//     },
//     "timezone": 3600,
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
// }