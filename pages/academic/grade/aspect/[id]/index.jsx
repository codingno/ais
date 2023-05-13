import BasicLayout from "../../../../../components/utils/BasicLayout";

import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrintIcon from '@mui/icons-material/Print';
import Box from "@mui/material/Box";
import plusFill from "@iconify/icons-eva/plus-fill";
import editFill from "@iconify/icons-eva/edit-fill";
// material
import {
  Autocomplete,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Grid,
	Modal,
	MenuItem,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TextField,
	Select,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Scrollbar from "../../../../../components/utils/Scrollbar";
import SearchNotFound from "../../../../../components/utils/SearchNotFound";
import { CategoryListHead } from "../../../../../components/utils/grade";
import TopMenu from "../../../../../components/utils/TopMenu";
import MoreMenu from "../../../../../components/utils/MoreMenu";
import ListToolbar from "../../../../../components/utils/ListToolbarGrade";
import getObjectValue from "../../../../../components/academic/grade/student/hooks/logics/getObjectValue";
import FormParent from "../../../../../components/utils/FormParent";

import TableMasterGradeAspect from './tableMasterGradeAspect'

import axios from "axios";
import { useSession } from "next-auth/react"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

function applySortFilter(array, comparator, query, filterObject) {
  // console.log(
  //   "🚀 ~ file: List.jsx ~ line 53 ~ applySortFilter ~ array, comparator, query",
  //   array,
  //   query,
  //   filterObject
  // );
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    const queryLowerCase = query.toLowerCase();
    const isExist = (x) =>
      x
        ? Array.isArray(x)
          ? x.filter((y) => y.toLowerCase().indexOf(queryLowerCase) !== -1)[0]
          : x.toLowerCase().indexOf(queryLowerCase) !== -1
        : false;
    return filter(
      array,
      // (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      (_user) => {
        return !filterObject
          ? isExist(_user.name)
          : !Array.isArray(filterObject[0])
          ? isExist(getObjectValue(_user, filterObject))
          : filterObject
              .map((x) => isExist(getObjectValue(_user, x)))
              .filter((x) => x)[0];
      }
    );
  }
  return stabilizedThis.map((el) => el[0]);
}


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function (props) {
  // const { title, name, tableHead, getUrl, addLink, moremenu, deleteOptions, isUserList } =
    // props;
		const { data: session, status : statusSession } = useSession()
		const { isUserList } = props

    const router = useRouter();

    const { id } = router.query


		let
        title="Course Grade Aspect",
        name="Aspect",
        getUrl="/api/grade-aspect-course?academic_schedule_id=" + id,
        addLink=`/academic/grade/aspect/${id}/create`,
        tableHead=[
          { id: "name", label: "Name", alignRight: false },
          { id: "percentage", label: "Percentage (%)", alignRight: false },
          { id: "position", label: "Position", alignRight: false },
          // { id: "start_time", label: "Start At",alignRight: false, type : "Time" },
          // { id: "end_time", label: "End At",alignRight: false, type : "Time" },
          // { id: "room_name", label: "Room", alignRight: false },
          // { id: "teacher_name", label: "Teacher", alignRight: false },
          // { id: "confirm", label: "Status", center : 'center' },
          { id: "" },
        ],
        moremenu=[
          {
            name: "Edit",
            link: `/academic/grade/aspect/${id}/edit/`,
          },
        ],
        deleteOptions={
          link: "/api/academic-krs/",
          note: "Are you sure to delete this item?",
        };

	// if(statusSession == 'authenticated')
	// 			if(session.user.role_id <= 4)
	// 				tableHead.unshift({id: "student_name", label : "Student Name", alignRight : false })

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("position");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isLoading, setLoading] = useState(true);
	
	const [mode, setMode] = useState(false)
  const [dataList, setDataList] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);

	const [openModal, setOpenModal] = useState(false)
  const [selectedKRS, setSelectedKRS] = useState({});
	const [grade, setGrade] = useState("")
	const [gradeOptions, setGradeOptions] = useState([])

	const [yearSelected, setYearSelected] = useState(null)
	const [yearOptions, setYearOptions] = useState([])

	const [courseSelected, setCourseSelected] = useState(null)
	const [courseOptions, setCourseOptions] = useState([])
  
  const [masterGradeAspect, setMasterGradeAspect] = useState([])
  const [loadingCopyMasterGradeAspect, setLoadingCopyMasterGradeAspect] = useState(false)
  console.log("🚀 ~ file: index.jsx ~ line 167 ~ masterGradeAspect", masterGradeAspect)

  useEffect(() => {
    if(openModal)
      getMasterGradeAspect()

    async function getMasterGradeAspect() {
      try {
        const { data } = await axios.get('/api/grade-aspect') 
        if(!data || data?.length == 0)
          throw new Error('Data not found')
        setMasterGradeAspect(data)
      } catch (error) {
        if(error.response)
          alert(error.response.data) 
        else
          alert(error) 
      }
    }
  }, [openModal])
  

	useEffect(() => {
    if(session?.user?.isTeacher)
		  getYearOptions()

    async function getYearOptions() {
      try {
       const { data }  = await axios.get('/api/academic_schedule_year?teacher_id=' + session.user.teacherData.id)
       if(!data)
        return
       setYearOptions(data)
       setYearSelected(data[0])
      } catch (error) {
        if(error.response) 
          alert(error.response.data)
        else
          alert(error)
      }
    }
	},[session])

	useEffect(() => {
    if(session?.user?.isTeacher && yearSelected)
		  getOptions()

    async function getOptions() {
      try {
       const { data }  = await axios.get(`/api/academic_schedule_course?academic_year_id=${yearSelected.academic_year_id}&teacher_id=` + session.user.teacherData.id)
       if(!data)
        return
       setCourseSelected(data[0]||"")
       setCourseOptions(data)
      } catch (error) {
        if(error.response) 
          alert(error.response.data)
        else
          alert(error)
      }
    }
	},[session, yearSelected])

	useEffect(() => {
		getGradeOptions()
	},[])

	async function getGradeOptions() {
		try {
			const { data } = await axios.get('/api/grade')
			setGradeOptions(data.data)
		} catch (error) {
			alert(error)	
		}	
	}

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

	async function saveCourseSelection() {
		if(window.confirm('Are you sure for selected item?'))
		try {
			const preparedData = dataList.filter(function(item) { 
				return this.indexOf(item.id) >= 0 
			}, selected).map(item => {
				return {
					// student_number : session.user.student_number,
					// semester : item.semester,
					schedule_id : item.id,
				}
			})
			console.log(preparedData);
			const { data } = axios.post('/api/academic-krs', preparedData)
			setMode(false)
      console.log(`🚀 ~ file: index.jsx ~ line 185 ~ saveCourseSelection ~ data`, data)
		} catch (error) {
      console.log(`🚀 ~ file: index.jsx ~ line 186 ~ saveCourseSelection ~ error`, error)
			alert(error)	
		}	
	}

  useEffect(() => {
		if(statusSession == 'authenticated' && id && isLoading)
    	getDataList();
  }, [mode, statusSession, id, isLoading]);

  async function getDataList() {
    try {
      // const { data, error } = await axios.get(mode ? `/api/academic-schedule` : getUrl);
      const { data, error } = await axios.get(getUrl);
      setDataList(data);
      setLoading(false)
      // setSelected(data[0])
			// if(mode) {
			// 	let filterSemesterAndDepartement = data.data.filter(item => item.course.semester == session.user.semester_active && item.departement_id == session.user.departementID)
      // 	setDataList(filterSemesterAndDepartement);
			// 	setSelected(selectedSchedule)
			// }
			// else {
      //   if(!data)
      //     return
      //   if(!data.data)
      //     return
			// 	const list = data.data.map(item => item = { ...item.schedule, ...item}).filter(item => item.confirm == true)
      // 	setDataList(list);
			// 	const ids = list.map(item => item.id)
			// 	setSelectedSchedule(ids)
			// 	setSelected([])
			// }
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }

	function editGrade(row) {
		if(!row.grade_id)
			setGrade("")
		else
			setGrade(row.grade_id)
		setSelectedKRS(row)
		setOpenModal(true)
	}

	async function submitGrade() {
		if(window.confirm(`Are you sure to submit this grade of ${courseSelected.course.name} to ${selectedKRS.student_name}?`))
		try {
			const prepareData = {
				id : selectedKRS.id,
				grade_id : grade == "" ? null : grade,
			}
			await axios.patch('/api/academic-krs', prepareData)
			router.reload()
		} catch (error) {
			alert(error)	
		}	
	}

  const courseList = [
    {
      id: 1,
      name: "Faculty of Education",
      // code : 'FE2021',
      status: "Active",
    },
    {
      id: 2,
      name: "Faculty of Islamic Studies",
      // code : 'FIS2021',
      status: "Active",
    },
    {
      id: 3,
      name: "Faculty of Social Sciences",
      // code : 'FSS2021',
      status: "Non Active",
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  // const filteredUsers = courseList ? applySortFilter(courseList, getComparator(order, orderBy), filterName) : [];
  const filteredUsers =
    dataList.length > 0
      ? applySortFilter(dataList, getComparator(order, orderBy), filterName)
      : [];
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <BasicLayout title="Course Grade">
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Card sx={modalStyle}>
				 <Stack
						direction="row"
						alignItems="center"
						sx={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
            {
              masterGradeAspect &&
              <TableMasterGradeAspect masterGradeAspect={masterGradeAspect} />
            }
          </Stack>	
				 <Stack
						direction="row"
						alignItems="center"
            mt={3}
						sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
					>
              <Button
                sx={{
                  ml : 2,
                }}
                variant="contained"
                onClick={async () => {
                  setLoadingCopyMasterGradeAspect(true)
                  try {
                    const prepareData = masterGradeAspect.map(x => ({
                      academic_schedule_id : id,
                      name : x.name,
                      percentage : x.percentage,
                      position : x.position,
                    }))                
                    for await (let data of prepareData) {
                      await axios.post('/api/grade-aspect-course', data)
                    }
                    setOpenModal(false)
                    setLoadingCopyMasterGradeAspect(false)
                    setLoading(true)
                  } catch (error) {
                    if(error.response)
                      alert(error.response.data) 
                    else
                      alert(error) 
                    setLoadingCopyMasterGradeAspect(false)
                  }
                }}
                startIcon={<Icon icon="fa6-solid:copy" />}
                disabled={loadingCopyMasterGradeAspect}
              >
                Copy aspects
              </Button>
          </Stack>
				</Card>
			</Modal>
      <Grid item xs={10} p={1}>
        <Card
					sx={{
						maxHeight : `calc(100vh + ${-120 + (emptyRows * 47) + 52}px)`,
					}}
				>
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            justifyContent="flex-start"
            p={5}
						pb={1}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
						{/* <Box>

							{
								!mode &&
            <Button
              variant="contained"
							color="secondary"
              onClick={() => router.push(router.pathname + '/pdf')}
              startIcon={!mode && <Icon icon={PrintIcon} />}
							sx={{ m : 1 }}
            >
							Course Registration Card
            </Button>
							}
            <Button
              variant="contained"
              onClick={() => { setDataList([]); setMode(!mode)}}
              startIcon={!mode && <Icon icon={editFill} />}
            >
							{
								mode ?
								'Close Edit' :
              	'Edit ' + name
							}
            </Button>
						</Box> */}
            {
              dataList.length == 0 &&
              <Button
                sx={{
                  ml : 'auto',
                }}
                variant="contained"
                onClick={() => setOpenModal(true)}
                startIcon={<Icon icon="fa6-solid:copy" />}
              >
              Copy from Master Grade Aspect
              </Button>
            }
              <Button
                sx={{
                  ml : 
                  dataList.length == 0 ?
                  2 : 'auto',
                }}
                variant="contained"
                onClick={() => router.push(addLink)}
                startIcon={<Icon icon={plusFill} />}
              >
                Add {name}
              </Button>
          </Stack>
          <Divider />

          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            toolbarName={name}
						saveCourseSelection={saveCourseSelection}
            // refresh={() => dispatch({type : 'refresh_start'})}
            // additionalToolbar={
            //   <>
            //   {
						// 		yearOptions.length > 0 &&
						// 		<Autocomplete 
						// 			sx={{ minWidth : 250, ml : 3, }}
						// 			value={yearSelected}
						// 			onChange={(event, data) => { setYearSelected(data); 
            //         // setReload(true)
            //       }}
						// 			options={yearOptions}
						// 			getOptionLabel={(option) => option?.academic_year_id}
						// 			renderInput={(params) => (
						// 			<TextField
						// 				{...params}
						// 				// label={params.fullname}
						// 				label="Year"
						// 				item={params?.academic_year_id}
						// 				// fullWidth
						// 				inputProps={{
						// 					...params.inputProps,
						// 					// autoComplete: "disabled", // disable autocomplete and autofill
						// 				}}
						// 			/>
						// 			)}
						// 		/>
						// 		}
            //   {
						// 		courseOptions.length > 0 &&
            //     <>
            //       <Autocomplete 
            //         sx={{ minWidth : 250, ml : 3, }}
            //         value={courseSelected}
            //         onChange={(event, data) => { setCourseSelected(data); 
            //           // setReload(true)
            //         }}
            //         options={courseOptions}
            //         getOptionLabel={(option) => option?.course.name}
            //         renderInput={(params) => (
            //         <TextField
            //           {...params}
            //           // label={params.fullname}
            //           label="Course"
            //           // item={params.course.id}
            //           // fullWidth
            //           inputProps={{
            //             ...params.inputProps,
            //             // autoComplete: "disabled", // disable autocomplete and autofill
            //           }}
            //         />
            //         )}
            //       />
            //       {
            //         courseSelected.course_grade_aspect && [1].map(() => {
            //           const { course_grade_aspect } = courseSelected
            //           const isEdit = course_grade_aspect.length > 0
            //           return(
            //             <Button variant="contained" sx={{ ml : 'auto', }}
            //               onClick={() => router.push('/academic/grade/aspect/'+courseSelected.id)}
            //             >
            //               {
            //                 isEdit ? 'Edit ' : 'Create '
            //               }
            //               Grade Aspect
            //             </Button>
            //           )
            //         })
            //       }
            //     </>
						// 		}
            //   </>
            // }
          />

          <Scrollbar>
            {isLoading ? (
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <TableContainer
              // sx={{ minWidth: 800 }}
              >
                <Table size="small">
                  <CategoryListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHead}
                    rowCount={dataList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
										mode={mode}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, indexRow) => {
                        const {
                          id,
                          name,
                          shortname,
                          code,
                          category_code,
                          position,
                          status,
                          image_url,
                          user_enrollment,
                          createdBy,
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;
												let tempRow = JSON.parse(JSON.stringify(row))

                        // delete row.id;
                        const tableHeadId = tableHead.map((item) => item.id);
                        tableHeadId.pop()
                        Object.keys(tempRow).map((item) => {
                          if (tableHeadId.indexOf(item) < 0) {
														if(isUserList && item == 'user')
															row.name = row.user.name
														delete tempRow[item];
													} 
                        });
												const arrayRow = Object.keys(tempRow)
												if(isUserList) {
													arrayRow.unshift(arrayRow[arrayRow.length - 1])
													arrayRow.pop()
												}
                        const columCell = tableHeadId.map(
                          (item, index) => {
														let render = row[item]
														if(tableHead[index].type == 'Date' && render) {
															const options = { year: 'numeric', month: 'long', day: 'numeric', hour : 'numeric', minute : 'numeric', hour12 : false };
															render = new Date(row[item]).toLocaleString('default', options)
														}
														else if(tableHead[index].type == 'Time' && render) {
															render = new Date(row[item]).toTimeString().split('GMT')[0]
														}

														if(item == 'confirm') {
															if(mode)
																return ""
                            return (
                              <TableCell align="center" key={index}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
																	justifyContent="center"
                                  spacing={1}
                                >
                                  <Typography variant="subtitle2" noWrap>
																		{
																		row[item] !== null ?
																		<Button
																			variant="contained"
																			color={row[item] ? 'success' : 'error'}
																			size="small"
																			disabled
																			sx={{
																				'&.Mui-disabled' : { backgroundColor: row[item] ? '#0E8074' : '#922E2E', color : '#FFF' }
																			}}
																		>
																			{row[item] ? 'Approved' : 'Rejected'}
																		</Button> :
																		<Button
																			variant="contained"
																			color={row[item] ? 'success' : 'error'}
																			size="small"
																			disabled
																			// sx={{
																			// 	'&.Mui-disabled' : { backgroundColor: row[item] ? '#0E8074' : '#922E2E', color : '#FFF' }
																			// }}
																		>
																			Pending
																		</Button> 
																		}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
														}
                            return (
                              <TableCell align="left" key={index}>
                                <Stack
                                  direction="row"
                                  alignItems="left"
                                  spacing={1}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {render}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          }
                        );
                        // if(user.role_id == 1 || user_enrollment.split(',').indexOf(user.id) >= 0 || createdBy == user.id)
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            sx={{
                              bgcolor: indexRow % 2 > 0 ? "#F4F4F4" : "#E9E9E9",
                            }}
                          >
                            <TableCell padding="checkbox" key="uniqueKey1">
                              {/* <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, id)}
                              /> */}
                            </TableCell>
                            {columCell}
                            {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
																{name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{status || "None"}</TableCell> */}
                            {
                              // <TableCell align="right">
															// 	{
															// 		session.user.role_id <= 3 &&
															// 		<Button
															// 			variant="contained"
															// 			color="secondary"
															// 			size="small"
															// 			onClick={() => editGrade(row)}
															// 		>
															// 			{row.grade_id ? 'Edit Grade' : 'Add Grade'}
															// 		</Button>
															// 		// <MoreMenu
															// 		// 	id={id}
															// 		// 	name={name}
															// 		// 	moremenu={moremenu}
															// 		// 	deleteOptions={deleteOptions}
															// 		// />
															// 	}
                              //   {/* <MoreMenu
                              //     id={id}
                              //     name={name}
                              //     moremenu={moremenu}
                              //     deleteOptions={deleteOptions}
                              //   /> */}
                              // </TableCell>
                            }
                            {
                              <TableCell align="right">
                                  <MoreMenu
                                    id={id}
                                    name={name}
                                    moremenu={moremenu}
                                    deleteOptions={deleteOptions}
                                  />
                              </TableCell>
                            }
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
		</BasicLayout>
  );
}
