import React from 'react'
import { Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from '@mui/material'

function TableMasterGradeAspect({masterGradeAspect}) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead sx={{ color : '#FFF', }} color="white">
          <TableRow sx={{ backgroundColor : '#003B5C', }} color="white">
            <TableCell sx={{ '&.MuiTableCell-root' : { color : '#FFFFFF'}}}>Name</TableCell>
            <TableCell sx={{ '&.MuiTableCell-root' : { color : '#FFFFFF'}}}>Percentage</TableCell>
            <TableCell sx={{ '&.MuiTableCell-root' : { color : '#FFFFFF'}}}>Position</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {
              masterGradeAspect &&
              masterGradeAspect.map((master_grade, indexRow) =>
                <TableRow
                  sx={{
                    bgcolor: indexRow % 2 > 0 ? "#F4F4F4" : "#E9E9E9",
                  }}
                >
                  <TableCell>
                    {master_grade.name}
                  </TableCell>
                  <TableCell sx={{ textAlign : 'center', }}>
                    {master_grade.percentage}
                  </TableCell>
                  <TableCell sx={{ textAlign : 'center', }}>
                    {master_grade.position}
                  </TableCell>
                </TableRow>
                )
            }
          </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableMasterGradeAspect