import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
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
    .then(data => {setShowTomorrow(data.prices.length > 27); return processPowerData(data.prices)})
    .then(data => setPowerData(data))
  }, [])

  const tableRef = useRef<typeof UsageTable>();
  const [showTomorrow, setShowTomorrow] = useState<boolean>(false);
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

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log('e', e);
    const data = new FormData(e.target);
    const form: Usage = {
      name: data.get('name')?.toString() || '',
      start: data.get('start')?.toString() || '00:00',
      end: data.get('end')?.toString() || '00:00',
      powerWatt: Number(data.get('powerWatt')),
    }
    form.start = form.start.indexOf(':') === 1 ? '0' + form.start : form.start;
    form.end = form.end.indexOf(':') === 1 ? '0' + form.end : form.end;
    const newUsage: Usage[] = JSON.parse(JSON.stringify(usageData));
    const foundUsageIndex: number | undefined = newUsage.findIndex((d) => d.name === form.name);
    if (foundUsageIndex > -1) {
      newUsage.splice(foundUsageIndex, 1, form);
    } else {
      newUsage.push(form);
    }
    setUsageData(newUsage);
    tableRef.current?.resetForm()
  }

  const handleRemoveClick = (i: number) => {
    const newUsage: Usage[] = JSON.parse(JSON.stringify(usageData));
    newUsage.splice(i, 1);
    setUsageData(newUsage);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UsageTable usageData={usageData} onRemoveClick={handleRemoveClick} onHandleSubmit={handleSubmit} ref={tableRef}/>

        <PowerChart powerData={powerData} usageData={usageData} showTomorrow={showTomorrow}/>
      </ThemeProvider>
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
