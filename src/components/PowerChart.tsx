import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart, Area } from 'recharts';
import { PowerPrice } from '../interfaces/PowerPrice';
import { Usage } from '../interfaces/Usage';

export type ChartProps = {
  powerData: PowerPrice[],
  usageData: Usage[]
}

export function PowerChart({ powerData, usageData }: ChartProps) {
  const areas: {name: string, data: PowerPrice[]}[] = getAreas();

  return (
    <ComposedChart width={730} height={300}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        dataKey="date"
        domain={['dataMin', 'dataMax']}
        tickFormatter={tick => new Date(tick).toTimeString().substring(0, 5)} />
      <YAxis label="Sähkön hinta (snt/kWh)" type="number" />
      {/* <Tooltip /> */}
      <Legend />
      <Line data={powerData} dataKey="value" stroke="#8884d8" dot={false} name="Sähkön hinta (snt/kWh, vasen asteikko)" />
      <Area data={areas[0].data} dataKey="value"/>
    </ComposedChart>
  )

  function getAreas(): {name: string, data: PowerPrice[]}[] {
    const areas: {name: string, data: PowerPrice[]}[] = [];
    usageData.forEach((u, i) => {
      const areaName = u.name;
      const startDate = new Date(new Date(powerData[12].date).toISOString().slice(0, 11) + u.start + ':00.000Z').getTime();
      const endDate = new Date(new Date(powerData[12].date).toISOString().slice(0, 11) + u.end + ':00.000Z').getTime();
      const areaData: PowerPrice[] = JSON.parse(JSON.stringify(powerData.filter((p) => p.date > startDate && p.date < endDate)))
      areaData.unshift({ date: startDate, value: powerData[i - 1]?.value });
      areaData.push({ date: endDate, value: powerData[i]?.value });
      areas.push({name: areaName, data: areaData})
    })
    console.log('areas', areas)
    console.log('powerdata', powerData)
    return areas;
  }
}
