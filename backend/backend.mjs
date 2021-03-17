import { writeFile } from 'fs'
import { readFile } from 'fs'
import { fetchUrl } from 'fetch'

const keyGoogle = 'AIzaSyCQUu01hvcUZo14XTn4dqKqW2sNG_fpGik'

// Promisify wait():
const wait = (ms) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

// Promisify openJSON():
const openJSON = (path) =>
  new Promise((resolve, reject) =>
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        try {
          resolve(JSON.parse(data.toString()))
        } catch {
          reject(new Error('Failed to parse JSON file.'))
        }
      }
    })
  )

// Promisify saveJSON():
const saveJSON = (path, data) =>
  new Promise((resolve, reject) => {
    let str = undefined
    try {
      str = JSON.stringify(data)
    } catch {
      reject(new Error('Failed stringify data.'))
    }
    writeFile(path, str, (err) => {
      if (err) {
        reject(err)
      }
      resolve(new Error('Failed to parse JSON file.'))
    })
  })

// Promisify fetchJSON():
const fetchJSON = (url) =>
  new Promise((resolve, reject) =>
    fetchUrl(url, (err, meta, body) => {
      if (err) {
        reject(err)
      } else {
        if (meta.status >= 200 && meta.status <= 299) {
          resolve(JSON.parse(body.toString()))
        } else {
          reject('Fetch request was unsuccessful.')
        }
      }
    })
  )

// http://bulk.openweathermap.org/sample/
async function getCitiesData() {
  return openJSON(
    '/Users/desk/Desktop/midterm-weather-app/backend/openweather-current.city.list.json'
  ).then((data) => {
    data.sort((a, b) => b.stat.population - a.stat.population)
    const citiesFiltered = data.filter((city) => {
      return city.name
    })
    const citiesFormatted = citiesFiltered.reduce((cities, city) => {
      cities.push({
        id: city.id,
        location: { lat: city.coord.lat, lng: city.coord.lon },
        zoom: city.zoom,
        population: city.stat.population,
        name: city.name,
        code: city.country,
        state: null,
      })
      return cities
    }, [])
    return Promise.resolve(citiesFormatted)
  })
}

// https://www.iso.org/obp/ui/
async function getCountriesData() {
  return openJSON(
    '/Users/desk/Desktop/midterm-weather-app/backend/iso-country-alpha2.json'
  ).then((data) => {
    return Promise.resolve(data)
  })
}

async function mapCountries(cities, countries) {
  cities.forEach((city) => {
    const country = countries.filter(
      (country) => country.code.toUpperCase() === city.code.toUpperCase()
    )
    city.country = country[0].name
  })
  return cities
}

async function prepareData1() {
  let cities = undefined

  cities = await mapCountries(await getCitiesData(), await getCountriesData())
  // await getFormattedName(cities)
  saveJSON(
    '/Users/desk/Desktop/midterm-weather-app/backend/cities1.json',
    cities
  )
  console.log(cities)
}

async function getGoogleState(cities) {
  for (let i = 0; i < cities.length; i++) {
    // for (let i = 15000; i < 20000; i++) {
    if (!cities[i].state) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cities[i].location.lat},${cities[i].location.lng}&key=${keyGoogle}`

      await fetchJSON(url).then((res) => {
        const components = res.results.reduce((components, obj) => {
          components = obj.address_components.reduce((components, obj) => {
            components.push(obj)
            return components
          }, components)
          return components
        }, [])
        const state_items = components.filter((component) => {
          return component.types.includes('administrative_area_level_1')
        })
        const country_items = components.filter((component) => {
          return component.types.includes('country')
        })
        const state = state_items.length
          ? state_items[state_items.length - 1].long_name
          : null
        const country = country_items.length
          ? country_items[country_items.length - 1].long_name
          : null
        cities[i].country = country
        cities[i].state = state
        console.log(
          `${i + 1} / ${cities.length}`,
          `${cities[i].name}, ${cities[i].state}, ${cities[i].country}`
        )
      })

      await wait(500)
      saveJSON(
        '/Users/desk/Desktop/midterm-weather-app/backend/cities1.json',
        cities
      )
    }
  }
}

async function prepareData2() {
  openJSON('/Users/desk/Desktop/midterm-weather-app/backend/cities1.json').then(
    (cities) => {
      getGoogleState(cities)
    }
  )
}

async function prepareData3() {
  openJSON('/Users/desk/Desktop/midterm-weather-app/backend/cities1.json').then(
    (cities) => {
      cities = cities.slice(0, 1000)
      saveJSON(
        '/Users/desk/Desktop/midterm-weather-app/backend/cities.json',
        cities
      )
    }
  )
}

async function prepareData4() {
  openJSON('/Users/desk/Desktop/midterm-weather-app/backend/cities1.json').then(
    (cities) => {
      cities.forEach((city) => {
        city.keywords = []
        if (city.name)
          city.keywords.push(
            city.name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
        if (city.state)
          city.keywords.push(
            city.state
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
        if (city.country)
          city.keywords.push(
            city.country
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
      })
      saveJSON(
        '/Users/desk/Desktop/midterm-weather-app/backend/cities.json',
        cities
      )
      console.log(cities)
    }
  )
}

// prepareData1()
// prepareData2()
// prepareData3()
prepareData4()

// openJSON('/Users/desk/Desktop/midterm-weather-app/backend/cities.json').then(
//   (cities) => {
//     console.log(cities.length)
//   }
// )

//delete city.code
