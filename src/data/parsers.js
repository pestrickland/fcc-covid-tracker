import format from './format'
import moment from 'moment'

function usStats (data) {
  const [usStatsRaw] = data

  return parseStats(usStatsRaw)
}

function stateStats (state, data) {
  const stateRawData = data.find(d => d.state === state)
  return parseStats(stateRawData)
}

function historicUS (historicData) {
  return parseHistoric(historicData)
}

function parseHistoric (historicData) {
  return [
    {
      label: 'Cases',
      key: 'positive',
      colour: 'rgb(100, 0, 200)'
    },
    {
      label: 'Recovered',
      key: 'recovered',
      colour: 'rgb(100, 100, 200)'
    },
    {
      label: 'Total tested',
      key: 'totalTestResults',
      colour: 'rgb(10, 30, 100)'
    },
    {
      label: 'Hospitalised',
      key: 'hospitalisedCurrently',
      colour: 'rgb(20, 100, 230)'
    },
    {
      label: 'Deaths',
      key: 'deaths',
      colour: 'rgb(255, 99, 132)'
    }
  ].reduce((prev, next) => {
    if (historicData.filter(d => d[next.key] !== null).length > 4) {
      prev.push(parseChart(historicData, next.key, next.label, next.colour))
    }

    return prev
  }, [])
}

function parseChart (historicData, key, label, colour) {
  const chartData = historicData.map(data => {
    return {
      x: moment(data.date, 'YYYYMMDD'),
      y: data[key] || 0
    }
  })

  return {
    label,
    data: chartData,
    fill: false,
    borderColor: colour
  }
}

function parseStats (rawStats) {
  return {
    cases: format.number(rawStats.positive),
    deaths: format.number(rawStats.death),
    recovered: format.number(rawStats.recovered),
    ventilators: format.number(rawStats.onVentilatorCurrently),
    hospitalised: format.number(rawStats.hospitalized),
    icu: format.number(rawStats.inIcuCurrently),
    tested: format.number(rawStats.totalTestResults),
    updated: moment(rawStats.lastModified).format('LLLL')
  }
}

export default {
  usStats, stateStats, historicUS
}
