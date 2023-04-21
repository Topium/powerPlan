import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
import { Usage } from '../interfaces/Usage';
import { BaseSyntheticEvent, forwardRef, useImperativeHandle, useState } from 'react';

export type UsageTableProps = {
  usageData: Usage[];
  onRemoveClick: (i: number) => void;
  onHandleSubmit: (e: BaseSyntheticEvent) => void;
}

export const UsageTable = forwardRef<{resetForm: () => void}, UsageTableProps>(({ usageData, onRemoveClick, onHandleSubmit }, ref) => {
  const resetForm = () => {
    setForm({ name: '', start: '', end: '', powerWatt: ''})
  }
  
  useImperativeHandle(ref, () => ({
    resetForm
  }));
  
  const [form, setForm] = useState<Usage>({
    name: '',
    start: '',
    end: '',
    powerWatt: ''
  })

  const handleCellClick = (i: number) => {
    console.log('usagedata', usageData[i]);
    setForm(usageData[i])
    console.log('form', form)
  }

  const handleChange = (e: BaseSyntheticEvent)  => {
    console.log('handlechange', e)
    const temp = {...form};
    const key: keyof typeof temp = e.target.name;
    temp[key] = e.target.value;
    
    setForm(temp);
  }

  const formHasEmptyFields = (): boolean => {
    return (
      form.name === '' ||
      form.start === '' ||
      form.end === '' ||
      form.powerWatt === ''
    )
  }

  return (
  <>
  <form id="powerUsageForm" onSubmit={onHandleSubmit}>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell>Power (W)</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usageData.map(((u, i) => (
          <TableRow key={i}>
            <TableCell onClick={() => handleCellClick(i)}>{u.name}</TableCell>
            <TableCell onClick={() => handleCellClick(i)}>{u.start}</TableCell>
            <TableCell onClick={() => handleCellClick(i)}>{u.end}</TableCell>
            <TableCell onClick={() => handleCellClick(i)}>{u.powerWatt}</TableCell>
            <TableCell><Button onClick={() => {onRemoveClick(i)}}>X</Button></TableCell>
          </TableRow>
        )))}
        <TableRow>
          <TableCell><TextField required value={form.name} onChange={(e) => handleChange(e)} name="name" label="Name" type='text' size="small"></TextField></TableCell>
          <TableCell><TextField required value={form.start} onChange={(e) => handleChange(e)} name="start" label="Start time (HH:MM)" type='text' size="small" inputProps={{ pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"}}></TextField></TableCell>
          <TableCell><TextField required value={form.end} onChange={(e) => handleChange(e)} name="end" label="End time (HH:MM)" type='text' size="small" inputProps={{ pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"}}></TextField></TableCell>
          <TableCell><TextField required value={form.powerWatt} onChange={(e) => handleChange(e)} name="powerWatt" label="Power consumption (W)" type='number' size="small"></TextField></TableCell>
          <TableCell><Button disabled={formHasEmptyFields()} type="submit" variant="contained">Save</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </form>
  </>
  )
})
