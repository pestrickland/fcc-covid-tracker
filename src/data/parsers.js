import format from "./format";
import moment from "moment"

function usStats(data) {
  const [usStatsRaw] = data

  return parseStats(usStatsRaw);
}

function stateStats(state, data) {
  const stateRawData = data.find(d => d.state === state);
  return parseStats(stateRawData)
}

export default {
  usStats, stateStats,
}

function parseStats(rawStats) {
  return {
    cases: format.number(rawStats.positive),
    deaths: format.number(rawStats.death),
    recovered: format.number(rawStats.recovered),
    ventilators: format.number(rawStats.onVentilatorCurrently),
    hospitalised: format.number(rawStats.hospitalized),
    icu: format.number(rawStats.inIcuCurrently),
    tested: format.number(rawStats.totalTestResults),
    updated: moment(rawStats.lastModified).format("LLLL")
  }

}
