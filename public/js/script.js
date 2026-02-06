const searchBar = document.getElementById('city__search')

function eventTrigger(ev){
    const city = ev.target.value

    async function getData(){
        try {
            const response = await fetch(`/api/weather?city=${city}`)
        
            if(!response.ok){
                const navCity = document.getElementById('nav__city')
                const htmlStatusWeather = document.getElementById('weatherStatus__status')
                const htmlTempWeather = document.getElementById('weatherStatus__tmp')
                const recomendations = document.getElementById('clothesRecomendations__p')

                navCity.innerText = 'Москва'
                htmlStatusWeather.innerText = 'Состояние погоды'
                htmlTempWeather.innerText = 'Температура'
                recomendations.innerText = 'Здесь будут рекомендации'

                throw new Error(`Ошибка HTTP: ${response.status}`)
            }

            const data = response.json()

            return data
        } catch (error) {
            console.log(`Произошла ошибка: ${error}`)
            throw error
        }
    }

    async function main() {
        try{
            const weatherData = await getData()
            console.log(weatherData)

            const navCity = document.getElementById('nav__city')
            const htmlStatusWeather = document.getElementById('weatherStatus__status')
            const htmlTempWeather = document.getElementById('weatherStatus__tmp')
            const recomendations = document.getElementById('clothesRecomendations__p')

            const status = weatherData.weather[0].description
            const temp = weatherData.main.temp

            navCity.innerText = weatherData.name
            htmlStatusWeather.innerText = status
            htmlTempWeather.innerText = Math.round(weatherData.main.temp)

            const tempRecomend = document.createElement('p')
            const statusRecomend = document.createElement('p')

            if(temp < -10){
                tempRecomend.innerText = 'Холодно! Советую одеть что-нибудь теплое! 🥶'
            } else if(temp < 0){
                tempRecomend.innerText = 'Прохладно. Одень что-нибудь потеплее 😪'
            } else if(temp < 10){
                tempRecomend.innerText = 'Не жарко. Стоит одеть легкую куртку 😌'
            } else if(temp < 20){
                tempRecomend.innerText = 'На улице тепло! Можно одеть что-то легкое 🥰'
            } else if(temp > 20){
                tempRecomend.innerText = 'На улице жарко! Одень легкую свободную одежду! 🥵'
            }

            if(status == 'ясно'){
                if(temp > 20) statusRecomend.innerText = 'А также ясно! Стоит надеть солнечные очки и головной убор 🔆'
                else statusRecomend.innerText = 'А также, на улице ясно 🔆'
            } else if(status == 'облачно'){
                if(weatherData.wind.speed > 5) statusRecomend.innerText = 'А также, на улице умеренный ветер, стоит быть осторожным 🌬'
                else if(weatherData.wind.speed > 7){
                   tempRecomend.innerText = 'На улице сильный ветер, стоит остаться дома 🌪' 
                   statusRecomend.innerText = ''
                }
                else if(weatherData.wind.speed < 5) statusRecomend.innerText = 'А также, на улице облачно 🌥'
            } else if(status == 'дождь'){
                statusRecomend.innerText = 'А также, возьмите зонтик ☔'
            }

            recomendations.innerHTML = tempRecomend.innerText
            recomendations.appendChild(statusRecomend.innerText)

        } catch(error){
            console.error('Не удалось получить данные: ', error)
        }
    }

    main()
}

searchBar.addEventListener("blur", ev => eventTrigger(ev))
searchBar.addEventListener("keypress", ev => {
    if(ev.key == 'Enter') eventTrigger(ev)
})