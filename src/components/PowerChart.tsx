import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart, Area } from 'recharts';
import { PowerPrice } from '../interfaces/PowerPrice';
import { Usage } from '../interfaces/Usage';

export type ChartProps = {
  powerData: PowerPrice[],
  usageData: Usage[],
  showTomorrow: boolean
}

export function PowerChart({ powerData, usageData, showTomorrow }: ChartProps) {
  const lineData: PowerPrice[] = showTomorrow ? powerData.slice(48) : powerData.slice(0,47)
  const areas: {name: string, data: PowerPrice[]}[] = getAreas(lineData);

  return (
    <>
    <h3>Sähkön hintaennuste { showTomorrow ? 'huomenna' : 'tänään'} { new Date(lineData[24]?.date).toLocaleDateString() }</h3>
    <ComposedChart width={730} height={300}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        dataKey="date"
        domain={['dataMin', 'dataMax']}
        tickFormatter={tick => new Date(tick).toTimeString().substring(0, 5)} />
      <YAxis yAxisId="left" orientation='left' label="Sähkön hinta (snt/kWh)" type="number" />
      <YAxis yAxisId="right" orientation='right' label="Kulutus" type="number" />
      {/* <Tooltip /> */}
      <Legend />
      <Line data={lineData} dataKey="value" stroke="#8884d8" dot={false} yAxisId="left" name="Sähkön hinta (snt/kWh, vasen asteikko)" />
      {areas.map((a) => (
        <Area yAxisId="right" data={a.data} dataKey="value"/>
      ))}
    </ComposedChart>
    </>
  )

  function getAreas(data: PowerPrice[]): {name: string, data: PowerPrice[]}[] {
    const areas: {name: string, data: PowerPrice[]}[] = [];
    if (data.length > 12 && usageData.length > 0) {
      usageData.forEach((u, i) => {
        const areaName = u.name;
        const startDate = new Date(new Date(data[12].date).toISOString().slice(0, 11) + u.start + ':00.000Z').getTime() + new Date().getTimezoneOffset() * 60000;
        const endDate = new Date(new Date(data[12].date).toISOString().slice(0, 11) + u.end + ':00.000Z').getTime() + new Date().getTimezoneOffset() * 60000;
        const areaData: PowerPrice[] = JSON.parse(JSON.stringify(data.filter((p) => p.date > startDate && p.date < endDate)))
        areaData.unshift({ date: startDate, value: areaData[0].value });
        areaData.push({ date: endDate, value: areaData[areaData.length - 1].value });
        areas.push({name: areaName, data: areaData.map((d) => { return ({date: d.date, value: d.value * Number(u.powerWatt) / 1000})} )})
      })
    }
    console.log('areas', areas)
    console.log('linedata', data)
    return areas;
  }
}
