// import dependencies
import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableSortLabel, TableBody, TableRow, TableCell, TablePagination, Typography, Button, Modal, CircularProgress } from '@mui/material'

import InputGrade from './InputGrade';
import alertError from '../../../../../utils/alertError';
import axios from 'axios';

const createSortHandler = (property) => (event) => {
  onRequestSort(event, property);
};

function StudentGradeListHead({ order, orderBy, headLabel }) {
  return (
    <TableHead
      sx={{
        bgcolor: '#003B5C',
        color: '#fff',
      }}
    >
      <TableRow
        sx={{
          bgcolor: '#003B5C',
          color: '#fff',
          position : 'relative',
        }}
      >
        <TableCell padding="checkbox"
          sx={{
            bgcolor: '#003B5C',
            // minWidth : 200,
          }}
        >
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        {headLabel.map((headCell) => {
          console.log("🚀 ~ file: StudentGradeList.jsx ~ line 41 ~ {headLabel.map ~ headCell", headCell)
          if (headCell.id == 'confirm' && mode)
            return ""
          return (
            <TableCell
              key={headCell.id}
              align={headCell.center ? headCell.center : headCell.alignRight ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                bgcolor: '#003B5C',
                // minWidth : headCell.label?.toLowerCase() == 'student name' ? 200 : 135 ,
                minWidth : headCell.label?.length >= 13 ? 200 : 60 ,
                textAlign : headCell.label?.toLowerCase() == 'student name' ? 'left' : 'center' ,
                px : 0,
              }}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  bgcolor: '#003B5C',
                  color: '#fff',
                  '&.Mui-active': {
                    color: '#E3A130',
                  }
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
        <TableCell padding="checkbox"
          sx={{
            bgcolor: '#003B5C',
            minWidth : 150,
            color: '#fff',
            textAlign : 'center',
          }}
        >
              <TableSortLabel
                hideSortIcon
                // active={orderBy === headCell.id}
                // direction={orderBy === headCell.id ? order : 'asc'}
                // onClick={createSortHandler(headCell.id)}
                sx={{
                  bgcolor: '#003B5C',
                  color: '#fff',
                  '&.Mui-active': {
                    color: '#E3A130',
                  }
                }}
              >
          Result
              </TableSortLabel>
        </TableCell>
        <TableCell padding="checkbox"
          sx={{
            bgcolor: '#003B5C',
            minWidth : 150,
            color: '#fff',
            textAlign : 'center',
          }}
        >
              <TableSortLabel
                hideSortIcon
                // active={orderBy === headCell.id}
                // direction={orderBy === headCell.id ? order : 'asc'}
                // onClick={createSortHandler(headCell.id)}
                sx={{
                  bgcolor: '#003B5C',
                  color: '#fff',
                  '&.Mui-active': {
                    color: '#E3A130',
                  }
                }}
              >
          Grade
              </TableSortLabel>
        </TableCell>
        <TableCell padding="checkbox"
          sx={{
            bgcolor: '#003B5C',
            minWidth : 150,
            color: '#fff',
            textAlign : 'center',
            position: "sticky",
            right: 0,
            zIndex: 999,
          }}
        >
              <TableSortLabel
                hideSortIcon
                sx={{
                  bgcolor: '#003B5C',
                  color: '#fff',
                  '&.Mui-active': {
                    color: '#E3A130',
                  }
                }}
              >
              Action
              </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

function StudentGradeList({ headLabel, studentList, setStudentList, setReload }) {
  console.log("🚀 ~ file: StudentGradeList.jsx ~ line 134 ~ StudentGradeList ~ headLabel", headLabel)
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("position");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [masterGrade, setMasterGrade] = useState([])
  console.log(`🚀 ~ file: StudentGradeList.jsx ~ line 166 ~ StudentGradeList ~ masterGrade`, masterGrade)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMasterGrade() 

    async function getMasterGrade() {
      try {
        const { data } = await axios.get('/api/grade')
        if(data?.data)
          setMasterGrade(data.data)
      } catch (error) {
        alertError(error) 
      }
    }
  }, [])
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentList.length) : 0;

  if(!studentList)
    return ""

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: `calc(100vh + ${-400 + emptyRows * 47 + 52}px)`,
          overflowY : 'auto',
        }}
      >
        <Table size="small" stickyHeader aria-label="sticky table" >
          <StudentGradeListHead order={order} orderBy={orderBy} headLabel={headLabel} />
          <TableBody>
            {
              loading ?
              <Modal
                open={loading}
                // onClose={() => setLoading(false)}
                sx={{ display: "flex" }}
              >
                <CircularProgress sx={{ margin: "auto" }} />
              </Modal> :
              studentList.map((item, indexRow) =>
                <TableRow key={indexRow}>
                  <TableCell padding="checkbox" key="uniqueKey1"
                          sx={{
                            // bgcolor:
                            //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                          }}
                  >
                    {/* <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, id)}
                                /> */}
                  </TableCell>
                  <TableCell
                          sx={{
                            // bgcolor:
                            //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                          }}
                  >
                    {item.student.user.name}
                  </TableCell>
                  {
                    headLabel.map((head, indexHead) => {
                      // console.log("🚀 ~ file: StudentGradeList.jsx ~ line 94 ~ headLabel.map ~ head", head)
                      if (indexHead == 0)
                        return ""
                      // console.log("🚀 ~ file: StudentGradeList.jsx ~ line 85 ~ headLabel.map ~ indexHead", indexHead)
                      return (
                        <TableCell
                          align='center'
                          sx={{
                            // bgcolor:
                            //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                          }}
                        >
                          <InputGrade value={item.student_grade_per_aspect.filter(x => x.course_grade_aspect_id == head.id)[0]?.grade || ""} 
                            label={head.label}
                            updateValue={(newValue) => {
                              console.log("🚀 ~ file: StudentGradeList.jsx ~ line 117 ~ headLabel.map ~ newValue", newValue)
                              let currentValue = structuredClone(studentList)
                              currentValue.map((x,idx) => {
                                const indexValue = x.student_grade_per_aspect.findIndex(y => y.course_grade_aspect_id == head.id)
                                if ( item.id == x.id) {
                                  if(indexValue < 0) {
                                    currentValue[idx].student_grade_per_aspect.push({
                                      academic_krs_id : x.id,
                                      course_grade_aspect_id : head.id,
                                      grade : newValue,
                                      grade_by_percentage : head.percentage,
                                    })

                                  } else {
                                    currentValue[idx].student_grade_per_aspect[indexValue].grade = newValue
                                    // currentValue[idx].student_grade_per_aspect[indexValue] = newValue
                                  }

                                  const grade = currentValue[idx].student_grade_per_aspect.reduce((a,b) => parseInt(b.grade) * (b.grade_by_percentage/100) + a, 0)
                                  currentValue[idx].grade_value = grade.toFixed(2)
                                }
                              })
                              setStudentList(currentValue)
                              console.log("🚀 ~ file: StudentGradeList.jsx ~ line 116 ~ currentValue.map ~ currentValue", currentValue)

                            }}
                          />
                        </TableCell>
                      )
                    }
                    )
                  }
                  <TableCell
                    align='center'
                          sx={{
                            // bgcolor:
                            //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                          }}
                  >
                    <Typography variant="subtitle2" color="initial">
                      {item.grade_value}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='center'
                          sx={{
                            // bgcolor:
                            //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                          }}
                  >
                    <Typography variant="subtitle2" color="initial">
                      {masterGrade.filter(x => item.grade_value >= parseFloat(x.minimum) && item.grade_value >= parseFloat(x.minimum))[0]?.grade}
                      {/* {item.grade_value} */}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      position: "sticky",
                      right: 0,
                      zIndex: 999,
                      // bgcolor:
                      //   indexRow % 2 > 0 ? "#F4F4F4" : "#C0C0C0",
                        textAlign : 'center',
                    }}
                  >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={async () => {
                      if(!confirm('Are you sure to change the grade?'))
                        return
                      try {
                        setLoading(true)
                        masterGrade.map(x => {
                          console.log("🚀 ~ file: StudentGradeList.jsx ~ line 296 ~ onClick={ ~ x.minimum <= item.grade_value && item.grade_value < x.maximum", x.minimum <= item.grade_value && item.grade_value < x.maximum)
                          console.log("🚀 ~ file: StudentGradeList.jsx ~ line 296 ~ onClick={ ~ x.minimum <= item.grade_value && item.grade_value < x.maximum", x.minimum , item.grade_value , x.maximum)
                          if(parseFloat(x.minimum) <= parseFloat(item.grade_value) && parseFloat(item.grade_value) < parseFloat(x.maximum))
                            item.grade_id = x.id
                        })
                        await axios.post('/api/grade-course-list', [item]) 
                        await axios.post('/api/student-grade-per-aspect', item.student_grade_per_aspect) 
                        setReload(true)
                        setLoading(false)
                      } catch (error) {
                        alertError(error)
                        setLoading(false)
                      }
                    }}
                    
                  >
                   Save 
                  </Button>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 30, 40, 50]}
        component="div"
        count={studentList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default StudentGradeList