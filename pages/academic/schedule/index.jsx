import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";
import alertError from "../../../utils/alertError";


import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

export default function () {
  const router = useRouter();

  const { departement_id, academic_year_id } = router.query

  const { data : session, status : statusSession } = useSession()

  const [academicYear, setAcademicYear] = useState([])
  const [academicYearSelected, setAcademicYearSelected] = useState(null)

  const [departement, setDepartement] = useState([])
  const [departementSelected, setDepartementSelected] = useState(null)

  useEffect(() => {
    if(!session)
      return

    if(session.user?.role_id == parseInt(process.env.NEXT_PUBLIC_BOD_ROLE))
      getDepartement()

    async function getDepartement() {
     try {
      const { data : get }  = await axios.get('/api/departement')
      console.log("🚀 ~ file: index.jsx ~ line 32 ~ getDepartement ~ get", get)
      if(!get?.data)
        return

      setDepartement(get.data)
      if(departement_id)
        setDepartementSelected(get.data.filter(x => x.id == departement_id)[0]??get.data[0])
      else {
        setDepartementSelected(get.data[0])
        router.query.departement_id = get.data[0]?.id
        router.push(router)
      }
      
     } catch (error) {
      alertError(error) 
     } 
    }

  }, [session])

  useEffect(() => {
    // if(!departementSelected)
    //   return

    getAcademicYear()

    async function getAcademicYear() {
     try {
      const { data }  = await axios.get('/api/academic_schedule_year' + (!departementSelected ? '' : '?departement_id=' + departementSelected?.id))
      if(!data)
        return

      setAcademicYear(data)

      if(academic_year_id)
        setAcademicYearSelected(data.filter(x => x.academic_year_id == academic_year_id )[0]??data[0])
      else {
        setAcademicYearSelected(data[0])
        router.query.academic_year_id = data[0].academic_year_id
        router.push(router)
      }
      
     } catch (error) {
      alertError(error) 
     } 
    }

  }, [departementSelected])

  const getUrl = `/api/academic-schedule${!departement_id ? '' : ('?departement_id=' + departement_id) }${!academic_year_id ? '' : (departement_id ? '&' : '?' + ('academic_year_id=' + academic_year_id))}`
  console.log("🚀 ~ file: index.jsx ~ line 71 ~ getUrl", getUrl)

  if (statusSession == 'unauthenticated') {
    router.push('/auth/signin')
    return ""
  }

  if(statusSession == 'loading')
    return <BasicLayout title="Course Schedule"></BasicLayout>

  return (
    <BasicLayout title="Course Schedule">
      <List
        title="Course Schedule"
        name="Schedule"
        // getUrl={`/api/academic-schedule${!departementSelected ? '' : ('?departement_id=' + departementSelected?.id) }`}
        // getUrl={departement_id && academic_year ? getUrl : null}
        getUrl={getUrl}
        addLink={ 
          session.user.role_id != 1 ? null :
          "/academic/schedule/create"
        }
        additionalToolbar={
          <>
          {
            departement.length > 0 &&
            <Autocomplete 
              sx={{ minWidth : 250, ml : 3, }}
              value={departementSelected}
              onChange={(event, data) => { 
                setDepartementSelected(data); 
                router.query.departement_id = data?.id
                router.push(router)
                // setReload(true)
              }}
              options={departement}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
              <TextField
                {...params}
                // label={params.fullname}
                label="Study Program"
                // item={params?.academic_year_id}
                // fullWidth
                inputProps={{
                  ...params.inputProps,
                  // autoComplete: "disabled", // disable autocomplete and autofill
                }}
              />
              )}
            />
            }
          {
            academicYear.length > 0 &&
            <Autocomplete 
              sx={{ minWidth : 130, ml : 3, }}
              value={academicYearSelected}
              onChange={(event, data) => { 
                setAcademicYearSelected(data); 
                router.query.academic_year_id = data?.academic_year_id??""
                router.push(router)
                // setReload(true)
              }}
              options={academicYear}
              getOptionLabel={(option) => option?.academic_year_id.toString()}
              renderInput={(params) => (
              <TextField
                {...params}
                // label={params.fullname}
                label="Academic Year"
                item={params?.academic_year_id}
                // fullWidth
                inputProps={{
                  ...params.inputProps,
                  // autoComplete: "disabled", // disable autocomplete and autofill
                }}
              />
              )}
            />
            }
          </>
        }
        tableHead={[
          { id: "name", label: "Course", alignRight: false, sx : { minWidth : 250 } },
          { id: "course_code", label: "Course Code", alignRight: false, sx : { minWidth : 200 } },
          { id: "departement_name", label: "Study Program",alignRight: false, sx : { minWidth : 200 } },
          { id: "academic_year_id", label: "Year",alignRight: false },
          { id: "day_name", label: "Day",alignRight: false, sx : { minWidth : 150 } },
          { id: "start_time", label: "Start At",alignRight: false, type : "Time" },
          { id: "end_time", label: "End At",alignRight: false, type : "Time" },
          { id: "room_name", label: "Room",alignRight: false, sx : { minWidth : 150 } },
          { id: "teacher_name", label: "Lecturer 1",alignRight: false, sx : { minWidth : 250 } },
          { id: "teacher_2_name", label: "Lecturer 2",alignRight: false, sx : { minWidth : 250 } },
          { id: "" },
        ]}
        moremenu={[
          {
            name : "Students",
            link: "/academic/schedule/student/",
            icon : "bi:people-fill",
          },
          session.user.role_id != 1 ? {} :
          {
            name: "Edit",
            link: "/academic/schedule/edit/",
          },
        ]}
        deleteOptions={
          session.user.role_id != 1 ? {} :
          {
          link: "/api/academic-schedule/",
          note: "Are you sure to delete this item?",
        }}
        filterObject={[
          ['course_code'],
          ['departement_name'],
          ['day_name'],
        ]}
      />
    </BasicLayout>
  );
}
