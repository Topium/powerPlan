import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import { UsageTableProps } from '../App';

export function UsageTable({ usageData }: UsageTableProps) {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell>Power (W)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usageData.map(((u, i) => (
          <TableRow key={i}>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.start}</TableCell>
            <TableCell>{u.end}</TableCell>
            <TableCell>{u.powerWatt}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  </TableContainer>;
}
