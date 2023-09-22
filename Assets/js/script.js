var weatherApiKey = '249506049aa732c8bd69f2c5fc992d9f';
var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
var searchBtn = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar');

function currentWeather(city) {
    var catURL = weatherApiUrl + city + `&appid=${weatherApiKey}&units=imperial`;
    fetch(catURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
        })
}






searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBar.value;
    currentWeather(city);
    console.log(city)
});
