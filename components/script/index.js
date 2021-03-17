'use strict'

const defaultCityId = 6173331
const keyOpenWeather = '447d701d9ad0f211a520848054cbe752'
const units = 'metric'
const input = document.getElementById('input')
const datalist = document.getElementById('datalist')
const selection = document.getElementById('selection')

let cities = undefined
let city = undefined
let historical = undefined
let forecast = undefined
let current = undefined

let tblTemperature = undefined
let tblRainSnow = undefined
let tblPollution = undefined

nav_home.addEventListener('click', () => {
  document.getElementById('main_home').className = 'main show'
  document.getElementById('main_temperature').className = 'main hide'
  document.getElementById('main_rainsnow').className = 'main hide'
  document.getElementById('main_pollution').className = 'main hide'
  document.getElementById('main_searchbox').className = 'main hide'

  document.getElementById('aside_home').className = 'aside show'
  document.getElementById('aside_temperature').className = 'aside hide'
  document.getElementById('aside_rainsnow').className = 'aside hide'
  document.getElementById('aside_pollution').className = 'aside hide'
  document.getElementById('aside_searchbox').className = 'aside hide'

  document.getElementById('nav_home').className =
    'nav-button nav-button-selected btn btn-primary'
  document.getElementById('nav_temperature').className =
    'nav-button btn btn-dark'
  document.getElementById('nav_rainsnow').className = 'nav-button btn btn-dark'
  document.getElementById('nav_pollution').className = 'nav-button btn btn-dark'
  document.getElementById('nav_searchbox').className = 'nav-button btn btn-dark'
})

nav_temperature.addEventListener('click', () => {
  document.getElementById('main_home').className = 'main hide'
  document.getElementById('main_temperature').className = 'main show'
  document.getElementById('main_rainsnow').className = 'main hide'
  document.getElementById('main_pollution').className = 'main hide'
  document.getElementById('main_searchbox').className = 'main hide'

  document.getElementById('aside_home').className = 'aside hide'
  document.getElementById('aside_temperature').className = 'aside show'
  document.getElementById('aside_rainsnow').className = 'aside hide'
  document.getElementById('aside_pollution').className = 'aside hide'
  document.getElementById('aside_searchbox').className = 'aside hide'

  document.getElementById('nav_home').className = 'nav-button btn btn-dark'
  document.getElementById('nav_temperature').className =
    'nav-button nav-button-selected btn btn-primary'
  document.getElementById('nav_rainsnow').className = 'nav-button btn btn-dark'
  document.getElementById('nav_pollution').className = 'nav-button btn btn-dark'
  document.getElementById('nav_searchbox').className = 'nav-button btn btn-dark'

  drawChartTemperature()
})

nav_rainsnow.addEventListener('click', () => {
  document.getElementById('main_home').className = 'main hide'
  document.getElementById('main_temperature').className = 'main hide'
  document.getElementById('main_rainsnow').className = 'main show'
  document.getElementById('main_pollution').className = 'main hide'
  document.getElementById('main_searchbox').className = 'main hide'

  document.getElementById('aside_home').className = 'aside hide'
  document.getElementById('aside_temperature').className = 'aside hide'
  document.getElementById('aside_rainsnow').className = 'aside show'
  document.getElementById('aside_pollution').className = 'aside hide'
  document.getElementById('aside_searchbox').className = 'aside hide'

  document.getElementById('nav_home').className = 'nav-button btn btn-dark'
  document.getElementById('nav_temperature').className =
    'nav-button btn btn-dark'
  document.getElementById('nav_rainsnow').className =
    'nav-button nav-button-selected btn btn-primary'
  document.getElementById('nav_pollution').className = 'nav-button btn btn-dark'
  document.getElementById('nav_searchbox').className = 'nav-button btn btn-dark'

  drawChartRainSnow()
})

nav_pollution.addEventListener('click', () => {
  document.getElementById('main_home').className = 'main hide'
  document.getElementById('main_temperature').className = 'main hide'
  document.getElementById('main_rainsnow').className = 'main hide'
  document.getElementById('main_pollution').className = 'main show'
  document.getElementById('main_searchbox').className = 'main hide'

  document.getElementById('aside_home').className = 'aside hide'
  document.getElementById('aside_temperature').className = 'aside hide'
  document.getElementById('aside_rainsnow').className = 'aside hide'
  document.getElementById('aside_pollution').className = 'aside show'
  document.getElementById('aside_searchbox').className = 'aside hide'

  document.getElementById('nav_home').className = 'nav-button btn btn-dark'
  document.getElementById('nav_temperature').className =
    'nav-button btn btn-dark'
  document.getElementById('nav_rainsnow').className = 'nav-button btn btn-dark'
  document.getElementById('nav_pollution').className =
    'nav-button nav-button-selected btn btn-primary'
  document.getElementById('nav_searchbox').className = 'nav-button btn btn-dark'

  drawChartPollution()
})

nav_searchbox.addEventListener('click', () => {
  document.getElementById('main_home').className = 'main hide'
  document.getElementById('main_temperature').className = 'main hide'
  document.getElementById('main_rainsnow').className = 'main hide'
  document.getElementById('main_pollution').className = 'main hide'
  document.getElementById('main_searchbox').className = 'main show'

  document.getElementById('aside_home').className = 'aside hide'
  document.getElementById('aside_temperature').className = 'aside hide'
  document.getElementById('aside_rainsnow').className = 'aside hide'
  document.getElementById('aside_pollution').className = 'aside hide'
  document.getElementById('aside_searchbox').className = 'aside show'

  document.getElementById('nav_home').className = 'nav-button btn btn-dark'
  document.getElementById('nav_temperature').className =
    'nav-button btn btn-dark'
  document.getElementById('nav_rainsnow').className = 'nav-button btn btn-dark'
  document.getElementById('nav_pollution').className = 'nav-button btn btn-dark'
  document.getElementById('nav_searchbox').className =
    'nav-button nav-button-selected btn btn-primary'
})

function drawChartTemperature() {
  // console.log(tblTemp)
  var data = google.visualization.arrayToDataTable(tblTemperature)

  var options = {
    // title: 'Company Performance',
    vAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    chartArea: { width: '90%', height: '90%' },
    backgroundColor: '#ffffff',
    is3D: true,
    // vAxis: { minValue: 0 },
    // smoothLine: true,
    curveType: 'function',
    // type: 'line',
    // series: { 2: { type: 'area' } },
    // hAxis: { format: 'MMM d hh a' },
    hAxis: {
      format: 'MMM d',
      textPosition: 'in',
      gridlines: { color: 'none' },
      vAxis: {},
    },

    vAxes: {
      0: {
        gridlines: { color: 'none' },
        format: '#°C',
        title: '',
        textPosition: 'in',
        // minValue: 0,
        // maxValue: 50,
      },
      1: {
        gridlines: { color: 'none' },
        format: '# %',
        title: '',
        textPosition: 'in',

        // viewWindowMode: 'explicit',
        // viewWindow: {
        //   max: 1.1,
        //   min: 0,
        // },
      },
    },
    lineWidth: 1,
    series: {
      0: { targetAxisIndex: 0, type: 'line' },
      1: { targetAxisIndex: 0, type: 'line' },
      2: { targetAxisIndex: 1, lineDashStyle: [4, 4] },
    },
    legend: { position: 'in' },
  }

  var chart = new google.visualization.ComboChart(
    document.getElementById('chart_temperature')
  )

  chart.draw(data, options)
}

function drawChartRainSnow() {
  // console.log(tblTemp)
  var data = google.visualization.arrayToDataTable(tblRainSnow)

  var options = {
    // title: 'Company Performance',
    vAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    chartArea: { width: '90%', height: '90%' },
    backgroundColor: '#ffffff',
    is3D: true,
    // vAxis: { minValue: 0 },
    // smoothLine: true,
    curveType: 'function',
    // type: 'line',
    // series: { 2: { type: 'area' } },
    // hAxis: { format: 'MMM d hh a' },
    hAxis: {
      format: 'MMM d',
      textPosition: 'in',
      gridlines: { color: 'none' },
      vAxis: {},
    },

    vAxes: {
      0: {
        gridlines: { color: 'none' },
        // format: '#°C',
        title: '',
        textPosition: 'in',
        minValue: 0,
        // maxValue: 50,
      },
      1: {
        gridlines: { color: 'none' },
        format: '# %',
        title: '',
        textPosition: 'in',

        viewWindowMode: 'explicit',
        viewWindow: {
          max: 1.1,
          min: 0,
        },
      },
    },
    lineWidth: 1,
    series: {
      0: { targetAxisIndex: 0, type: 'steppedArea' },
      1: { targetAxisIndex: 0, type: 'steppedArea' },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1, lineDashStyle: [4, 4] },
    },
    legend: { position: 'in' },
  }

  var chart = new google.visualization.ComboChart(
    document.getElementById('chart_rainsnow')
  )

  chart.draw(data, options)
}

function drawChartPollution() {
  // console.log(tblTemp)
  var data = google.visualization.arrayToDataTable(tblPollution)

  var options = {
    // title: 'Company Performance',
    vAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    chartArea: { width: '90%', height: '90%' },
    backgroundColor: '#ffffff',
    is3D: true,
    // vAxis: { minValue: 0 },
    // smoothLine: true,
    curveType: 'function',
    // type: 'line',
    // series: { 2: { type: 'area' } },
    // hAxis: { format: 'MMM d hh a' },
    hAxis: {
      format: 'MMM d',
      textPosition: 'in',
      gridlines: { color: 'none' },
      vAxis: {},
    },

    vAxes: {
      0: {
        gridlines: { color: 'none' },
        // format: '#°C',
        title: '',
        textPosition: 'in',
        // minValue: 0,
        // maxValue: 50,
      },
      1: {
        gridlines: { color: 'none' },
        format: '# %',
        title: '',
        textPosition: 'in',

        // viewWindowMode: 'explicit',
        // viewWindow: {
        //   max: 1.1,
        //   min: 0,
        // },
      },
    },
    lineWidth: 1,
    series: {
      0: { targetAxisIndex: 0, type: 'line' },
      1: { targetAxisIndex: 0, type: 'line' },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1, lineDashStyle: [4, 4] },
    },
    legend: { position: 'in' },
  }

  var chart = new google.visualization.ComboChart(
    document.getElementById('chart_pollution')
  )

  chart.draw(data, options)
}

async function getHistoricalWeather(city) {
  return Promise.all(
    // [0, 1]
    [0, 1, 2, 3, 4, 5]
      .map((day) => {
        let dtUnix = new Date()
        dtUnix.setDate(new Date().getDate() - day)
        dtUnix = Math.floor(dtUnix.getTime() / 1000)
        return `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${city.location.lat}&lon=${city.location.lng}&dt=${dtUnix}&units=${units}&appid=${keyOpenWeather}`
      })
      .map((url) =>
        fetch(url)
          .then(async (res) => await res.json())
          .catch((err) => {
            return Promise.reject(err)
          })
      )
  )
    .then((data) => {
      const hourly = []
      data.forEach((day) => day.hourly.forEach((hour) => hourly.push(hour)))
      hourly.sort((a, b) => a.dt - b.dt)
      return hourly
    })
    .then((hourly) => {
      const historical = []
      for (let i = 0; i < hourly.length; i++) {
        const dt = new Date(hourly[i].dt * 1000)
        if (dt.getUTCHours() % 3 === 0 && i >= 2) {
          historical.push({
            dt: new Date(dt),
            temp: hourly[i].temp,
            feels_like: hourly[i].feels_like,
            clouds: hourly[i].clouds / 100,
            rain:
              Math.round(
                (((hourly[i].rain ? hourly[i].rain['1h'] : 0) +
                  (hourly[i - 1].rain ? hourly[i - 1].rain['1h'] : 0) +
                  (hourly[i - 2].rain ? hourly[i - 2].rain['1h'] : 0)) /
                  3) *
                  100
              ) / 100,
            snow:
              Math.round(
                (((hourly[i].snow ? hourly[i].snow['1h'] : 0) +
                  (hourly[i - 1].snow ? hourly[i - 1].snow['1h'] : 0) +
                  (hourly[i - 2].snow ? hourly[i - 2].snow['1h'] : 0)) /
                  3) *
                  100
              ) / 100,
            humidity: hourly[i].humidity / 100,
            visibility: hourly[i].visibility,
            weather: hourly[i].weather,
            wind_deg: hourly[i].wind_deg,
            wind_speed: hourly[i].wind_speed * ((60 * 60) / 1000),
          })
        }
      }
      return historical
    })
    .then((historical) => {
      return Promise.resolve(historical)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getHistoricalPollution(city, dtFirst, dtLast) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${
      city.location.lat
    }&lon=${city.location.lng}&start=${Math.floor(
      dtFirst / 1000
    )}&end=${Math.floor(dtLast / 1000)}&appid=${keyOpenWeather}`
  )
    .then((res) => res.json())
    .then((data) => {
      const historical = []
      data.list.forEach((item) => {
        const dt = new Date(item.dt * 1000)
        if (dt.getUTCHours() % 3 === 0 && dt >= dtFirst && dt <= dtLast) {
          historical.push({
            dt: new Date(dt),
            aqi: item.main.aqi,
            co: item.components.co,
            nh3: item.components.nh3,
            no: item.components.no,
            no2: item.components.no2,
            o3: item.components.o3,
            pm2_5: item.components.pm2_5,
            pm10: item.components.pm10,
            so2: item.components.so2,
          })
        }
      })
      return historical
    })
    .then((historical) => {
      return Promise.resolve(historical)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getHistorical(city) {
  const weather = await getHistoricalWeather(city)
  const pollution = await getHistoricalPollution(
    city,
    weather[0].dt,
    weather[weather.length - 1].dt
  )
  const historical = []
  weather.forEach((w) => {
    pollution.forEach((p) => {
      if (w.dt.getTime() === p.dt.getTime()) {
        historical.push({
          dt: w.dt,
          weather: w,
          pollution: p,
        })
      }
    })
  })
  historical.forEach((h) => {
    delete h.weather.dt
    delete h.pollution.dt
  })
  return historical
}

async function getForecastWeather(city) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${city.location.lat}&lon=${city.location.lng}&units=${units}&appid=${keyOpenWeather}`
  )
    .then((res) => res.json())
    .then((data) => {
      const forecast = []
      data.list.sort((a, b) => a.dt - b.dt)
      data.list.forEach((item) => {
        forecast.push({
          dt: new Date(item.dt * 1000),
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          clouds: item.clouds.all / 100,
          rain: Math.round(((item.rain ? item.rain['3h'] : 0) / 3) * 100) / 100,
          snow: Math.round(((item.snow ? item.snow['3h'] : 0) / 3) * 100) / 100,
          humidity: item.main.humidity / 100,
          visibility: item.visibility,
          weather: item.weather,
          wind_deg: item.wind.deg,
          wind_speed: item.wind.speed * ((60 * 60) / 1000),
        })
      })
      return forecast
    })
    .then((forecast) => {
      return Promise.resolve(forecast)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getForecastPollution(city, dtFirst, dtLast) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${city.location.lat}&lon=${city.location.lng}&appid=${keyOpenWeather}`
  )
    .then((res) => res.json())
    .then((data) => {
      const forecast = []
      data.list.forEach((item) => {
        const dt = new Date(item.dt * 1000)
        if (dt.getUTCHours() % 3 === 0 && dt >= dtFirst && dt <= dtLast) {
          forecast.push({
            dt: new Date(dt),
            aqi: item.main.aqi,
            co: item.components.co,
            nh3: item.components.nh3,
            no: item.components.no,
            no2: item.components.no2,
            o3: item.components.o3,
            pm2_5: item.components.pm2_5,
            pm10: item.components.pm10,
            so2: item.components.so2,
          })
        }
      })
      return forecast
    })
    .then((forecast) => {
      return Promise.resolve(forecast)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getForecast(city) {
  const weather = await getForecastWeather(city)
  const pollution = await getForecastPollution(
    city,
    weather[0].dt,
    weather[weather.length - 1].dt
  )
  const forecast = []
  weather.forEach((w) => {
    pollution.forEach((p) => {
      if (w.dt.getTime() === p.dt.getTime()) {
        forecast.push({
          dt: w.dt,
          weather: w,
          pollution: p,
        })
      }
    })
  })
  forecast.forEach((h) => {
    delete h.weather.dt
    delete h.pollution.dt
  })
  return forecast
}

async function getCurrentWeather(city) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${city.location.lat}&lon=${city.location.lng}&units=${units}&appid=${keyOpenWeather}`
  )
    .then((res) => res.json())
    .then((data) => {
      const current = {
        dt: new Date(data.dt * 1000),
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        clouds: data.clouds.all / 100,
        rain: data.rain ? data.rain['1h'] : 0,
        snow: data.snow ? data.snow['1h'] : 0,
        humidity: data.main.humidity / 100,
        visibility: data.visibility,
        weather: data.weather,
        wind_deg: data.wind.deg,
        wind_speed: data.wind.speed * ((60 * 60) / 1000),
      }
      return current
    })
    .then((current) => {
      return Promise.resolve([current])
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getCurrentPollution(city, dt) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.location.lat}&lon=${city.location.lng}&appid=${keyOpenWeather}`
  )
    .then((res) => res.json())
    .then((data) => {
      const current = {
        dt: dt,
        aqi: data.list[0].main.aqi,
        co: data.list[0].components.co,
        nh3: data.list[0].components.nh3,
        no: data.list[0].components.no,
        no2: data.list[0].components.no2,
        o3: data.list[0].components.o3,
        pm2_5: data.list[0].components.pm2_5,
        pm10: data.list[0].components.pm10,
        so2: data.list[0].components.so2,
      }
      return current
    })
    .then((current) => {
      return Promise.resolve([current])
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

async function getCurrent(city) {
  const weather = await getCurrentWeather(city)
  const pollution = await getCurrentPollution(city, weather[0].dt)
  const current = []
  weather.forEach((w) => {
    pollution.forEach((p) => {
      if (w.dt.getTime() === p.dt.getTime()) {
        current.push({
          dt: w.dt,
          weather: w,
          pollution: p,
        })
      }
    })
  })
  current.forEach((h) => {
    delete h.weather.dt
    delete h.pollution.dt
  })
  return current
}

function toCamelCase(str) {
  return str
    .split(' ')
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

function toProperCase(str) {
  return str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
}

async function loadCities() {
  return fetch(`/components/json/cities.json`)
    .then((res) => res.json())
    .then((cities) => cities.slice(0, 10000))
    .then((city) => Promise.resolve(city))
    .catch((err) => Promise.reject(err))
}

function renderDropdown(dropdown) {
  let html = ''
  dropdown.forEach((city) => {
    const name =
      city.name +
      (city.state ? ', ' + city.state : '') +
      (city.country ? ', ' + city.country : '')
    html =
      html +
      `<div class="city-button btn btn-warning" onclick="loadCity(${city.id})">${name}</div>`
  })
  selection.innerHTML = html
}

async function loadCity(id) {
  input.value = ''
  selection.innerHTML = ''
  document.getElementById('nav_home').click()
  city = cities.filter((city) => {
    return city.id === id
  })[0]

  forecast = await getForecast(city)
  historical = await getHistorical(city)
  current = await getCurrent(city)
  console.log('CITY')
  console.log(city)
  console.log('FORECAST')
  console.log(forecast)
  console.log('HISTORICAL')
  console.log(historical)
  console.log('CURRENT')
  console.log(current)

  document.getElementById(
    'logo'
  ).innerHTML = `<img src="http://openweathermap.org/img/w/${current[0].weather.weather[0].icon}.png">`
  document.getElementById('name').innerHTML = city.name
  document.getElementById(
    'image'
  ).innerHTML = `<img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${current[0].weather.weather[0].icon}.png">`
  document.getElementById(
    'temp'
  ).innerHTML = `${current[0].weather.temp.toFixed(1)}°C`
  document.getElementById(
    'feels-like'
  ).innerHTML = `${current[0].weather.feels_like.toFixed(1)}°C`
  document.getElementById('rain').innerHTML = `${current[0].weather.rain} mm/h`
  document.getElementById('snow').innerHTML = `${current[0].weather.snow} mm/h`
  document.getElementById('aqi').innerHTML = `${current[0].pollution.aqi}`
  document.getElementById('clouds-description').innerHTML = `${toProperCase(
    current[0].weather.weather[0].description
  )}`

  //   <div id="rain"></div>
  //   <div id="snow"></div>
  //   <div id="aqi"></div>
  //   <div id="clouds-description"></div>

  tblTemperature = [['', 'Temperature', 'Feels-Like', 'Wind-Speed']]
  historical.forEach((item) => {
    tblTemperature.push([
      item.dt,
      item.weather.temp,
      item.weather.feels_like,
      item.weather.wind_speed,
    ])
  })
  forecast.forEach((item) => {
    tblTemperature.push([
      item.dt,
      item.weather.temp,
      item.weather.feels_like,
      item.weather.wind_speed,
    ])
  })

  tblRainSnow = [['', 'Rain', 'Snow', 'Clouds', 'Humidity']]
  //   console.log(historical)
  //   console.log(forecast)
  historical.forEach((item) => {
    tblRainSnow.push([
      item.dt,
      item.weather.rain,
      item.weather.snow,
      item.weather.clouds,
      item.weather.humidity,
    ])
  })
  forecast.forEach((item) => {
    tblRainSnow.push([
      item.dt,
      item.weather.rain,
      item.weather.snow,
      item.weather.clouds,
      item.weather.humidity,
    ])
  })

  tblPollution = [
    ['', 'AQI', 'CO', 'NO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10', 'NH3'],
  ]
  //   console.log(historical)
  //   console.log(forecast)
  historical.forEach((item) => {
    tblPollution.push([
      item.dt,
      item.pollution.aqi,
      item.pollution.co,
      item.pollution.no,
      item.pollution.no2,
      item.pollution.o3,
      item.pollution.so2,
      item.pollution.pm2_5,
      item.pollution.pm10,
      item.pollution.nh3,
    ])
  })
  forecast.forEach((item) => {
    tblPollution.push([
      item.dt,
      item.pollution.aqi,
      item.pollution.co,
      item.pollution.no,
      item.pollution.no2,
      item.pollution.o3,
      item.pollution.so2,
      item.pollution.pm2_5,
      item.pollution.pm10,
      item.pollution.nh3,
    ])
  })
}

window.onload = async () => {
  cities = await loadCities()
  loadCity(defaultCityId)
  google.charts.load('current', { packages: ['corechart'] })
}

input.addEventListener('keyup', () => {
  if (input.value.trim() === '') {
    renderDropdown([])
  } else {
    const dropdown = cities.filter((city) => {
      return city.keywords.reduce((include, keyword) => {
        return include || keyword.includes(input.value.toLowerCase())
      }, false)
    })
    renderDropdown(dropdown)
  }
})
