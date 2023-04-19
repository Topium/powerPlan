import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
import { Usage } from '../interfaces/Usage';
import { BaseSyntheticEvent } from 'react';

export type UsageTableProps = {
  usageData: Usage[];
  onRemoveClick: (i: number) => void;
  onHandleSubmit: (e: BaseSyntheticEvent) => void;
}

export function UsageTable({ usageData, onRemoveClick, onHandleSubmit }: UsageTableProps) {
  return (
  <>
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
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.start}</TableCell>
            <TableCell>{u.end}</TableCell>
            <TableCell>{u.powerWatt}</TableCell>
            <TableCell><Button onClick={() => {onRemoveClick(i)}}>X</Button></TableCell>
          </TableRow>
        )))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  <form onSubmit={onHandleSubmit}>
    <TextField name="name" label="Name" type='text'></TextField>
    <TextField name="start" label="Start time (HH:MM)" type='text'></TextField>
    <TextField name="end" label="End time (HH:MM)" type='text'></TextField>
    <TextField name="powerWatt" label="Power consumption (W)" type='number'></TextField>
    <Button type="submit" variant="contained">Save new</Button>
  </form>
  </>
  )
}
