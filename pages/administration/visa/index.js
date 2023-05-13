import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Students Visa Expired">
      <List
        title="Students Visa Expired"
        name="Student"
				getUrl={`/api/student?expiredVisa=${new Date()}`}
        // addLink="/master/student/create"
				isUserList={true}
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "student_number", label: "NIM", alignRight: false },
          { id: "faculty_name", label: "Faculty", alignRight: false },
          { id: "student_program", label: "Program", alignRight: false },
          { id: "entry_year", label: "Entry Year", alignRight: false },
          { id: "teacher_name", label: "Teacher", alignRight: false },
          { id: "citizen", label: "Citizen", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "expiredVisa", label: "Expired Visa", type : 'Date', alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          // {
          //   name: "Edit",
          //   link: "/master/student/edit/",
          // },
          {
            name: "Email",
            link: "/master/student/edit/",
          },
        ]}
        // deleteOptions={{
        //   link: "/api/student",
        //   note: "Are you sure to delete this item?",
        // }}
      />
    </BasicLayout>
  );
}
