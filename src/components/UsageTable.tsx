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
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.start}</TableCell>
            <TableCell>{u.end}</TableCell>
            <TableCell>{u.powerWatt}</TableCell>
            <TableCell><Button onClick={() => {onRemoveClick(i)}}>X</Button></TableCell>
          </TableRow>
        )))}
        <TableRow>
          <TableCell><TextField name="name" label="Name" type='text' size="small"></TextField></TableCell>
          <TableCell><TextField name="start" label="Start time (HH:MM)" type='text' size="small" inputProps={{ pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"}}></TextField></TableCell>
          <TableCell><TextField name="end" label="End time (HH:MM)" type='text' size="small" inputProps={{ pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"}}></TextField></TableCell>
          <TableCell><TextField name="powerWatt" label="Power consumption (W)" type='number' size="small"></TextField></TableCell>
          <TableCell><Button type="submit" variant="contained">Save</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </form>
  </>
  )
}
