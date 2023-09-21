var weatherApiKey = '249506049aa732c8bd69f2c5fc992d9f';
var waetherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='

var searchBtn = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar')

async function readWeather(city) {

};








searchBtn.addEventListener('click', function () {
    readWeather(searchBar.value);
});