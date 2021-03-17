const keyOpenWeather = '447d701d9ad0f211a520848054cbe752'

const getBrowserLocation = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2000 })
  )

// // getBrowserLocation()
// //   .then(function (res) {
// //     console.log(`✅  ${res.coords.latitude}, ${res.coords.longitude}`)
// //   })
// //   .catch(function (err) {
// //     console.log(`🔥 Location must be turned on. (${err.message})`)
// //   })

const city = {
  id: 6173331,
  location: { lat: 49.24966, lng: -123.119339 },
  // location: { lat: 35.652832, lng: 139.839478 },
  zoom: 10,
  population: 1837969,
  name: 'Vancouver',
  state: 'British Columbia',
  country: 'Canada',
  code: 'CA',
}

// const units = 'imperial'
const units = 'metric'

// // One Call API

// fetch(
//   `https://api.openweathermap.org/data/2.5/onecall?lat=${city.location.lat}&lon=${city.location.lng}&units=${units}&appid=${keyOpenWeather}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data)
//   })

// // One Call API

// fetch(
//   `https://api.openweathermap.org/data/2.5/onecall?lat=${city.location.lat}&lon=${city.location.lng}&units=${units}&appid=${keyOpenWeather}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log('One Call API')
//     data.minutely.forEach((item) => {
//       const unixTimestamp = item.dt
//       const milliseconds = unixTimestamp * 1000 // 1575909015000
//       const dateObject = new Date(milliseconds)
//       const humanDateFormat = dateObject.toUTCString() //2019-12-9 10:30:15
//       item.dt = humanDateFormat
//       // console.log(humanDateFormat)
//     })
//     data.hourly.forEach((item) => {
//       const unixTimestamp = item.dt
//       const milliseconds = unixTimestamp * 1000 // 1575909015000
//       const dateObject = new Date(milliseconds)
//       const humanDateFormat = dateObject.toUTCString() //2019-12-9 10:30:15
//       item.dt = humanDateFormat
//       // console.log(humanDateFormat)
//     })
//     data.daily.forEach((item) => {
//       const unixTimestamp = item.dt
//       const milliseconds = unixTimestamp * 1000 // 1575909015000
//       const dateObject = new Date(milliseconds)
//       const humanDateFormat = dateObject.toUTCString() //2019-12-9 10:30:15
//       item.dt = humanDateFormat
//       // console.log(humanDateFormat)
//     })
//     console.log(data)
//   })
