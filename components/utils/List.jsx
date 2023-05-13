import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import plusFill from "@iconify/icons-eva/plus-fill";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Grid,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Scrollbar from "./Scrollbar";
import SearchNotFound from "./SearchNotFound";
import { CategoryListHead } from "./course";
import TopMenu from "./TopMenu";
import MoreMenu from "./MoreMenu";
import ListToolbar from "./ListToolbar";
import getObjectValue from "../academic/grade/student/hooks/logics/getObjectValue";

import axios from "axios";
import { useSession } from "next-auth/react";
import alertError from "../../utils/alertError";

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

export default function List(props) {
  const {
    title,
    name,
    tableHead,
    getUrl,
    addLink,
    generateLink,
    moremenu,
    deleteOptions,
    isUserList,
    readOnly,
    disableAdd,
    additionalToolbar,
    filterObject,
  } = props;

  const router = useRouter();
  const { data: session, status: statusSession } = useSession();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isLoading, setLoading] = useState(true);

  const [dataList, setDataList] = useState({ data: [], isLoad: false });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleGenerate = async () => {
    try {
      const { data, error } = await axios.get(generateLink);
      setDataList({ ...dataList, isLoad: false });
      // alert(data.message);
      alertError(data.message)
    } catch (error) {
      alertError(error)
      // if (error.response) {
      //   if ((error.response.status = 404))
      //     return alert(error.response.data.error);
      // }
    }
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  useEffect(() => {
    const controller = axios.CancelToken.source()
    if (!dataList.isLoad) getDataList(controller);
    else setLoading(false);

    return () => {
      controller.cancel()
    }
  }, [dataList]);

  useEffect(() => {
    setDataList(prev => ({...prev, isLoad : false}))
    setLoading(true)
  }, [getUrl])

  async function getDataList(controller) {
    if(!getUrl)
      return
    try {
      const { data, error } = await axios.get(getUrl, {
        cancelToken: controller.token, 
      });
      if (data.data) setDataList({ data: data.data, isLoad: true });
      else setDataList({ data: data, isLoad: true });
    } catch (error) {
      if (error.response) {
        setDataList({ ...dataList, isLoad: true });
        if ((error.response.status = 404)) return;
      }
      alertError(error)
      // alert(error);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.data.length) : 0;

  // const filteredUsers = courseList ? applySortFilter(courseList, getComparator(order, orderBy), filterName) : [];
  const filteredUsers =
    dataList.data.length > 0
      ? applySortFilter(
          dataList.data,
          getComparator(order, orderBy),
          filterName,
          filterObject
        )
      : [];
  const isUserNotFound = filteredUsers.length === 0;

  if (statusSession === "loading") return "";

  return (
    <>
      <Grid item xs={10} p={1}>
        <Card
          sx={{
            maxHeight: `calc(100vh + ${-120 + emptyRows * 47 + 52}px)`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={5}
            pb={1}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            {((!readOnly && !disableAdd) || session.user.isAdmin) &&
              generateLink && (
                <Button variant="contained" onClick={handleGenerate}>
                  Generate Student Number
                </Button>
              )}
            {((!readOnly && !disableAdd) || session.user.isAdmin) && addLink && (
              <Button
                variant="contained"
                onClick={() => router.push(addLink)}
                startIcon={<Icon icon={plusFill} />}
              >
                Add {name}
              </Button>
            )}
          </Stack>
          <Divider />

          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            toolbarName={name}
            additionalToolbar={additionalToolbar}
            // refresh={() => dispatch({type : 'refresh_start'})}
          />

          {/* <Scrollbar> */}

          <TableContainer
          // sx={{ minWidth: 800 }}
              sx={{
                maxHeight: `calc(100vh + ${-400 + emptyRows * 47 + 52}px)`,
                overflowY : 'auto',
              }}
          >
            <Table size="small" stickyHeader aria-label="sticky table" >
              <CategoryListHead
                order={order}
                orderBy={orderBy}
                headLabel={tableHead}
                rowCount={dataList.data.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              {isLoading ? (
                <TableBody>
                  <TableCell colSpan={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableBody>
              ) : (
                <>
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((initialRow, indexRow) => {
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
                        } = initialRow;
                        const isItemSelected = selected.indexOf(id) !== -1;
                        let row = JSON.parse(JSON.stringify(initialRow));
                        // console.log("🚀 ~ file: List.jsx ~ line 349 ~ .map ~ row", row)
                        delete row.id;
                        const tableHeadId = tableHead.map((item) => item.id);
                        Object.keys(row).map((item,idItem) => {

                          const tableHeadIndex =  tableHeadId.indexOf(item)           
                          if (tableHeadIndex < 0) {
														if(isUserList && item == 'user')
															row.name = row.user.name
														delete row[item];
													}
                          // if(row[item] && tableHead[tableHeadIndex]?.objectValue) {
													// 	// const key_value = 
                          //   row[item] = 
													// 		Array.isArray(tableHead[tableHeadIndex].objectValue) ?
													// 		getObjectValue(row[tableHead[tableHeadIndex].key || item],tableHead[tableHeadIndex].objectValue) :
													// 		row[item][tableHead[tableHeadIndex].objectValue]
													// }
                          if(row[item] && row[item].name)
                            row[item] = row[item].name
                          if(typeof row[item] === 'boolean')
                            row[item] = row[item] ? 'True' : 'False'
                        });
                        const tableHeadWithObjectValue = tableHead.filter(x => !!x.objectValue)
                        // console.log("🚀 ~ file: List.jsx ~ line 373 ~ .map ~ tableHeadWithObjectValue", tableHeadWithObjectValue)
                        tableHeadWithObjectValue.map(item => {
                          row[item.id] = 
															Array.isArray(item.objectValue) ?
															getObjectValue(initialRow,item.objectValue) :
															initialRow[item.objectValue]
                        })
                        // const arrayRow = Object.keys(row)
                        // console.log("🚀 ~ file: List.jsx ~ line 350 ~ .map ~ row", row)
                        let arrayRow = [];
                        Object.keys(row).map(
                          (item) => {
                            // console.log("🚀 ~ file: List.jsx ~ line 373 ~ .map ~ tableHeadId.indexOf(item)", tableHeadId.indexOf(item), item)
                            arrayRow[tableHeadId.indexOf(item)] = item
                          }
                        );
                        // if(isUserList) {
                        // 	arrayRow.unshift(arrayRow[arrayRow.length - 1])
                        // 	arrayRow.pop()
                        // }
                        const columCell = arrayRow.map((item, index) => {
                          let render = row[item];

                          // if(tableHead[index].objectValue)
                          //   render = getObjectValue(initialRow, tableHead[index].objectValue)

                          if (tableHead[index].type == "boolean") {
                            render = (
                              <Button
                                variant="contained"
                                color={render ? "success" : "error"}
                                size="small"
                                disabled={render == null}
                              >
                                {(!render
                                  ? render == null
                                    ? "Pending"
                                    : "Not "
                                  : "") +
                                  (render == null
                                    ? ""
                                    : tableHead[index].label)}
                              </Button>
                            );
                            return (
                              <TableCell
                                align="center"
                                key={index}
                                sx={{ maxWidth: 100 }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  spacing={1}
                                >
                                  {/* <Typography variant="subtitle2" noWrap> */}
                                  <Typography variant="subtitle2" >
                                    {/* {row[item]} */}
                                    {render}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          }
                          if (tableHead[index].type == "Date" && render) {
                            const options = {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: false,
                            };
                            render = new Date(row[item]).toLocaleString(
                              "default",
                              options
                            );
                          } else if (
                            tableHead[index].type == "Time" &&
                            render
                          ) {
                            render = new Date(row[item])
                              .toTimeString()
                              .split("GMT")[0];
                          } else if (
                            tableHead[index].type == "float" &&
                            render
                          ) {
                            render = typeof row[item] == "string" ? parseInt(row[item]).toFixed(2) : row[item].toFixed(2);
                          } else if (tableHead[index].link === true)
                            render = (
                              <a
                                href={(window ? ( window?.location?.origin + "/" ) : router.basePath ) + row[item]}
                                target="_blank"
                              >
                                link
                              </a>
                            );
                          return (
                            <TableCell
                              align="left"
                              key={index}
                              sx={{ maxWidth: 100 }}
                            >
                              <Stack
                                direction="row"
                                alignItems="left"
                                spacing={1}
                              >
                                {/* <Typography variant="subtitle2" noWrap> */}
                                  <Typography variant="subtitle2" >
                                  {/* {row[item]} */}
                                  {render}
                                </Typography>
                              </Stack>
                            </TableCell>
                          );
                        });
                        // console.log("ini kolom " , columCell)
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
                            {/* <TableCell padding="checkbox" key="uniqueKey1">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, id)}
                              />
                            </TableCell> */}
                            {columCell}
                            {tableHead.map((item, index) => {
                              if (item.type == "view") {
                                // console.log(initialRow.id);
                                return (
                                  <TableCell sx={{ maxWidth: 10 }}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      onClick={() => {
                                        router.push(item.link + initialRow.id);
                                      }}
                                    >
                                      View
                                    </Button>
                                  </TableCell>
                                );
                              }
                            })}
                            {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
																{name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{status || "None"}</TableCell> */}

                            {
                              <TableCell
                                align="right"
                                sx={{
                                  position: "sticky",
                                  right: 0,
                                  zIndex: 999,
                                  bgcolor:
                                    indexRow % 2 > 0 ? "#F4F4F4" : "#E9E9E9",
                                }}
                              >
                                {(!readOnly || session.user.isAdmin) && (
                                  <MoreMenu
                                    id={id}
                                    name={name}
                                    moremenu={moremenu}
                                    deleteOptions={deleteOptions}
                                  />
                                )}
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
                </>
              )}
            </Table>
          </TableContainer>

          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 30, 40, 50]}
            component="div"
            count={dataList.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
    </>
  );
}
