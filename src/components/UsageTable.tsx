import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Usage } from '../interfaces/Usage';

export type UsageTableProps = {
  usageData: Usage[];
  onRemoveClick: (i: number) => void;
}

export function UsageTable({ usageData, onRemoveClick }: UsageTableProps) {
  return <TableContainer component={Paper}>
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
      </TableBody>
    </Table>
  </TableContainer>;
}
