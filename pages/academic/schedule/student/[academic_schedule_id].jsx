import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import List from "../../../../components/utils/List";
import BasicLayout from "../../../../components/utils/BasicLayout";
import alertError from "../../../../utils/alertError";

export default function () {
  const router = useRouter();

  const { academic_schedule_id } = router.query

  const [academic_shcedule, setAcademicSchedule] = useState(null)

  useEffect(() => {
    if(academic_schedule_id)
      getAcademicSchedule()

    async function getAcademicSchedule() {
      try {
       const { data : getData }  = await axios.get('/api/academic-schedule?id=' + academic_schedule_id )
       if(getData)
        if(getData.data)
          setAcademicSchedule(getData.data)
      } catch (error) {
       alertError(error) 
      }
    }
  
    return () => {
    }
  }, [academic_schedule_id])
  

  if (!academic_schedule_id )
    return ""
  return (
    <BasicLayout title={"Course " + (!academic_shcedule ? "" : `${academic_shcedule.course.name} (${academic_shcedule.academic_year_id})`)}>
      <List
        title={"Student " + (!academic_shcedule ? "" : `of ${academic_shcedule.course.name} (${academic_shcedule.academic_year_id})`)}
        name="Student"
        getUrl={"/api/grade-course-list?academic_schedule_id=" + academic_schedule_id }
        // addLink="/academic/schedule/create"
        tableHead={[
          { id: "student_name", label: "Student Name", alignRight: false, sx : { minWidth : 250 }, objectValue : ['student','user','name'] },
          { id: "student_number", label: "NIM", alignRight: false, sx : { minWidth : 200 } },
          { id: "departement_name", label: "Study Program",alignRight: false, sx : { minWidth : 200 }, objectValue : ['student','departement','name'] },
          { id: "student_citizen", label: "Citizen",alignRight: false, sx : { minWidth : 200 }, objectValue : ['student','user','user_info', 'nationality'] },
          { id: "entry_year", label: "entry year", alignRight: false, sx : { minWidth : 150 }, objectValue : ['student','entry_year'] },
          // { id: "academic_year_id", label: "Year",alignRight: false },
          // { id: "day_name", label: "Day",alignRight: false, sx : { minWidth : 150 } },
          // { id: "start_time", label: "Start At",alignRight: false, type : "Time" },
          // { id: "end_time", label: "End At",alignRight: false, type : "Time" },
          // { id: "room_name", label: "Room",alignRight: false },
          // { id: "teacher_name", label: "Lecturer 1",alignRight: false, sx : { minWidth : 250 } },
          // { id: "teacher_2_name", label: "Lecturer 2",alignRight: false, sx : { minWidth : 250 } },
          { id: "" },
        ]}
        moremenu={[
          // {
          //   name : "Students",
          //   link: "/academic/schedule/student/",
          //   icon : "bi:people-fill",
          // },
          // {
          //   name: "Edit",
          //   link: "/academic/schedule/edit/",
          // },
        ]}
        // deleteOptions={{
        //   link: "/api/academic-schedule/",
        //   note: "Are you sure to delete this item?",
        // }}
        filterObject={[["student","user","name"],["student_number"]]}
      />
    </BasicLayout>
  );
}
