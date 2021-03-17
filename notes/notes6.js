const optionsTemp = {
  // title: 'Company Performance',
  vAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
  // vAxis: { minValue: 0 },
  // smoothLine: true,
  curveType: 'function',
  type: 'line',
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
      
      title: '',
      textPosition: 'in',
      minValue: -10,
      maxValue: 50,
    },
    1: {
      gridlines: { color: 'none' },
      format: '# km/h',
      title: '',
      textPosition: 'in',
      minValue: -10,
      maxValue: 50,
    },
  },
  series: {
    0: { targetAxisIndex: 0 },
    1: { targetAxisIndex: 1 },
    2: { targetAxisIndex: 1 },
  },
  legend: { position: 'in' },
}

// async function getCity(id) {
//   return fetch(`/components/json/cities.json`)
//     .then((res) => {
//       return res.json()
//     })
//     .then((data) => {
//       const city = data.filter((value) => {
//         return value.id === id
//       })
//       return city
//     })
//     .then((city) => {
//       return Promise.resolve(city)
//     })
//     .catch((err) => {
//       return Promise.reject(err)
//     })
// }




async function test2() {
  const [city] = await getCity()
  // console.log(city)

}

async function testCITY() {
  const [city] = await getCity()
  console.log(city)
}

console.log(
  new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
)
// testCITY()

// let chartData = []

function setChartData(forecast) {}

let forecast = undefined
let historical = undefined
let tblTemp = undefined

async function test10() {
  const [city] = await getCity(6173331)
  historical = await getHistorical(city)
  forecast = await getForecast(city)

}

function render10() {
  drawChart()
}

document.getElementById('TEST_CITY').addEventListener('click', test10)
document.getElementById('TEST_CHART').addEventListener('click', drawChart)

// async function test3() {
//   const [city] = await getCity()
//   const forecast = await getForecast(city)
//   // console.log(forecast)

//   const chart = await setChartData(forecast)
//   // console.log(chart)
//   return chart
// }

// console.log(test3())

// console.log(chartData)


// google.charts.setOnLoadCallback(drawChart)

