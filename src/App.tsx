import { useEffect, useState } from 'react'
import './App.css'
import { PowerPrice } from './interfaces/PowerPrice'
import { PowerPriceIncoming } from './interfaces/PowerPriceIncoming'
import { PowerChart } from './components/PowerChart'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import { Usage } from './interfaces/Usage'
import { UsageTable } from './components/UsageTable'

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
  const [usageData, setUsageData] = useState<Usage[]>([
    {
      name: 'test',
      start: '08:00',
      end: '11:00',
      powerWatt: 500
    }
  ])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UsageTable usageData={usageData} />
        <PowerChart powerData={powerData} usageData={usageData} />
      </ThemeProvider>
    </div>
  )
}

export type UsageTableProps = {
  usageData: Usage[]
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
