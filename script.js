const cityInput = document.getElementById('input-city')
const select = document.getElementById('select-country');
const bg = document.getElementsByClassName('second-container');

cityInput.value = 'Santa fe'
addDataCurrent()
addData()
cityInput.value = ''


//funcion para llamar a la API
async function fetchWeather(api) {
    const KEY = '97504058ed37ccbca2078e82e0c550c6';
    try {
        const res = await fetch(`${api}${cityInput.value},${select.value}&appid=${KEY}`)
        if(!res.ok){
            throw new Error('Error al obtener los datos del clima')
        }
        let data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

//funcion para agregar los datos actuales del clima
async function addDataCurrent() {
    let data = await fetchWeather('https://api.openweathermap.org/data/2.5/weather?q=');
    const nameCity = document.getElementById('name-city')
    nameCity.textContent = data.name;

    const dateCity = document.getElementById('date-city');
    let now = new Date();
    const month = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    dateCity.textContent = `${month[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${data.sys.country}`;

    tempCity = document.getElementById('temp-city');
    tempCity.textContent = `${Math.round(data.main.temp - 273.15)}°`

    imgCity = document.getElementById('img-city');
    imgData(data.weather[0].main,imgCity)

    const sunrise = document.getElementById('sunrise');
    const sunriseTimeTamp = data.sys.sunrise;
    let sunriseDate = new Date(sunriseTimeTamp * 1000);
    sunrise.textContent = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()} am`
     
    const sunset = document.getElementById('sunset');
    const sunsetTimeTamp = data.sys.sunset;
    let sunsetDate = new Date(sunsetTimeTamp * 1000);
    sunset.textContent = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()} pm`
    
    const humidity = document.getElementById('humidity');
    humidity.textContent = `${data.main.humidity}%`

    const windSpeed = document.getElementById('wind')
    windSpeed.textContent = `${Math.floor(data.wind.speed * 3.6)}km/h` 
}


//funcion para agregar los datos del clima
async function addData() {
    let data = await fetchWeather('https://api.openweathermap.org/data/2.5/forecast?q=');
    const maxTemp = document.querySelectorAll('.max-temp')
    maxTemp[0].textContent = `+${Math.round(data.list[6].main.temp_max - 273.15)}°`
    maxTemp[1].textContent = `+${Math.round(data.list[14].main.temp_max - 273.15)}°`
    maxTemp[2].textContent = `+${Math.round(data.list[21].main.temp_max - 273.15)}°`

    const day = document.querySelectorAll(".day");
    const days = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"];
    const today =  new Date();
    const day1 = new Date(today);
    day1.setDate(today.getDay() + 1)
    const day2 = new Date(today);
    day2.setDate(today.getDay() + 2)
    const day3 = new Date(today)
    day3.setDate(today.getDay() + 3)
    day[0].textContent = `${days[day1.getDay()]}`
    day[1].textContent = `${days[day2.getDay()]}`
    day[2].textContent = `${days[day3.getDay()]}`

    const iconDay = document.querySelectorAll('#icon-day');
    imgData(data.list[6].weather[0].main,iconDay[0])
    imgData(data.list[14].weather[0].main,iconDay[1])
    imgData(data.list[21].weather[0].main,iconDay[2])
    
}


// funcion de los iconos
function imgData(data,item){
    const cloud = "img/nubes.png";
    const rain = "img/lluvia.png"
    const thunder = "img/rayos.png";
    const sun = "img/sol.png";
    const snow = "img/snowy.png";

    if(data === 'Clouds'){
        item.setAttribute('src',cloud)
    }else if(data === 'Rain'){
        item.setAttribute('src',rain)
    }else if(data === 'Clear'){
        item.setAttribute('src',sun)
    }else if(data === 'Thunderstorm'){
        item.setAttribute('src',thunder)
    }else if(data === 'Drizzle'){
        item.setAttribute('src',rain)
    }else if(data === 'Snow'){
        item.setAttribute('src',snow)
    }else if(data === 'Atmosphere'){
        item.setAttribute('src',cloud)
    }
}


async function showWeather(){
    addData()
    addDataCurrent()
    cityInput.value = ''
}


cityInput.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        showWeather()
    }
})

