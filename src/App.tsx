import { useEffect, useState } from 'react'
import './App.css'
import { PowerPrice } from './interfaces/PowerPrice'
import { PowerPriceIncoming } from './interfaces/PowerPriceIncoming'

function App() {
  useEffect(() => {
    const todayMorning = new Date(new Date().setHours(0,0,0,0)).toISOString();
    const tomorrowEvening = new Date(new Date().setHours(48,0,0,0)).toISOString();
    fetch(`https://sahkotin.fi/prices?start=${todayMorning}&end=${tomorrowEvening}`)
    .then(response => response.json())
    .then(data => processPowerData(data.prices.slice(24)))
    .then(data => setPowerData(data));
  }, [])

  const [powerData, setPowerData] = useState<PowerPrice[]>([])

  return (
    <div className="App">
    </div>
  )
}

function processPowerData(prices: PowerPriceIncoming[]): any {
  const newData: {date: number, value: number}[] = [];
  prices.forEach((d, i) => {
    if (i > 0) {
      const hourEnd = new Date(prices[i - 1].date.replace('00:00.000', '59:59.999')).getTime();
      newData.push({date: hourEnd, value: prices[i - 1].value});
    }
    const hourStart = new Date(d.date).getTime();
    newData.push({date: hourStart, value: d.value});
  })
  return newData;
}

export default App
