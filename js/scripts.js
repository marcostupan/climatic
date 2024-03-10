// bb921c1e54ba607cdfc5220f73d71c71 MInha API no OpenWheater
// d6923e7a2a6f4109b7c3d3c1bbf86eab

// Variaveis e seleção dos elementos
const apiKey = "bb921c1e54ba607cdfc5220f73d71c71";
const apiCountryUrl = "https://flagcdn.com/16x12/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const wheatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

// Funções
const getWeatherData = async (city) => {
    const apiWheatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch(apiWheatherUrl)
        const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    wheatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    
    weatherContainer.classList.remove("hide")    

};

showWeatherData(cityElement);


// Eventos
// searchBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//      const city = cityInput.value;

//     console.log(city);
// });

document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.querySelector("#city-input");
    const searchBtn = document.querySelector("#search");

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const city = cityInput.value;

        showWeatherData(city);
    });
});

cityInput.addEventListener("keyup", (e) => {

    if(e.key === "Enter") {
        const city = e.target.value

        showWeatherData(city);
        console.log()
    }
})

// Mensagem de erro

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        alert("Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.");
        return;
    }

    showWeatherData(city);
});

cityInput.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
        const city = e.target.value;
        const data = await getWeatherData(city);

        if (data.cod === "404") {
            alert("Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.");
            return;
        }

        showWeatherData(city);
    }
});
