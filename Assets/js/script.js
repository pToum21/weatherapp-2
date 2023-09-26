var weatherApiKey = '249506049aa732c8bd69f2c5fc992d9f';
var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
var searchBtn = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar');
var h3El = document.querySelector('#city-title');
var windPEl = document.querySelector('#wind');
var tempPEl = document.querySelector('#temp');
var humidityPEl = document.querySelector('#humidity');
var fiveDayForecastEl = document.querySelector('#five-cards');
var saveListUl = document.querySelector('#save-btn-list');
savedata();
function currentWeather(city) {
    var catURL = weatherApiUrl + city + `&appid=${weatherApiKey}&units=imperial`;
    return new Promise((resolve, reject) => {
        fetch(catURL)
            .then(function (response) {
                if (response.status !== 200) {
                    throw new Error("Invalid city name");
                }
                return response.json();
            })
            .then(function (data) {
                var WeatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                var imageHTML = `<img src="${WeatherIcon}" alt="weather icon" width="40" height="46">`;
                var cityName = data.name;
                h3El.innerHTML = cityName + dayjs().format(' (M/D/YYYY)') + imageHTML;
                var windMPH = data.wind.speed;
                windPEl.textContent = 'Wind: ' + Math.floor(windMPH) + ' MPH';
                var cityTemp = data.main.temp;
                tempPEl.textContent = 'Temp: ' + Math.floor(cityTemp) + '°F';
                var cityHumidity = data.main.humidity;
                humidityPEl.textContent = 'Humidity: ' + Math.floor(cityHumidity) + '%';
                var cityLat = data.coord.lat;
                var cityLon = data.coord.lon;
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${weatherApiKey}`);
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                fiveDayForecastEl.innerHTML = '';
                for (var i = 0; i < data.list.length; i = i + 8) {
                    var WeatherIcon2 = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                    var imageHTML2 = `<img src="${WeatherIcon2}" alt="weather icon" width="46" height="70">`;
                    var card1 = document.createElement('h5');
                    card1.setAttribute('class', 'card col-2', 'style', 'width: 100%');
                    card1.innerHTML = dayjs(data.list[i + 1].dt_txt).format('(M/D/YYYY)') + imageHTML2;
                    fiveDayForecastEl.appendChild(card1);
                    var card2 = document.createElement('p');
                    card2.classList.add("card-text");
                    card2.textContent = 'Temp: ' + Math.floor(data.list[i].main.temp) + '°F';
                    card1.appendChild(card2);
                    var card3 = document.createElement('p');
                    card3.classList.add("card-text");
                    card3.textContent = 'Wind: ' + Math.floor(data.list[i].wind.speed) + ' MPH';
                    card1.appendChild(card3);
                    var card4 = document.createElement('p');
                    card3.classList.add("card-text");
                    card4.textContent = 'Humidity: ' + Math.floor(data.list[i].main.humidity) + '%';
                    card4.classList.add("card-text");
                    card1.appendChild(card4);
                }
                resolve(true);  // successfully got weather data
            })
            .catch(function (error) {
                console.error("Error fetching weather data: ", error);
                resolve(false);  // city wasn't valid or some other error occurred
            });
    });
}
function savedata() {
    saveListUl.innerHTML = "";
    var cities = JSON.parse(localStorage.getItem('cities'));
    if (cities) {
        for (let i = 0; i < cities.length; i++) {
            var recentSearches = document.createElement('button');
            var cityCharacters = cities[i].split(' ');
            for (let j = 0; j < cityCharacters.length; j++) {
                cityCharacters[j] = cityCharacters[j].charAt(0).toUpperCase() + cityCharacters[j].slice(1);
            }
            recentSearches.textContent = cityCharacters.join(' ');
            recentSearches.setAttribute('class', "btn btn-secondary col-12 m-1");
            recentSearches.addEventListener('click', function () { currentWeather(cities[i]); });
            saveListUl.appendChild(recentSearches);
        }
    }
}
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    city = searchBar.value;
    city = city.toLowerCase();
    currentWeather(city)
        .then(function (isValidCity) {
            if (!isValidCity) {
                console.log("Invalid city name. Not saving to local storage.");
                return;
            }
            var cities = JSON.parse(localStorage.getItem("cities")) || [];
            if (!cities.includes(city)) {
                cities.push(city);
                localStorage.setItem("cities", JSON.stringify(cities));
            }
            localStorage.setItem("city", city);
            savedata();
        })
        .catch(function (error) {
            console.log("Error in fetching data:", error);
        });
});