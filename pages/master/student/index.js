import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Students">
      <List
        title="Students"
        name="Student"
				getUrl="/api/student"
        addLink="/master/student/create"
        generateLink="/api/generate-student-number"
				isUserList={true}
        tableHead={[
          { id: "name", label: "Name", alignRight: false, sx : { minWidth : 200, } },
          { id: "student_number", label: "NIM", alignRight: false },
          { id: "faculty_name", label: "Faculty", alignRight: false, sx : { minWidth : 200, } },
          { id: "student_program", label: "Program", alignRight: false, sx : { minWidth : 200, } },
          { id: "entry_year", label: "Entry Year", alignRight: false, sx : { minWidth : 100, } },
          { id: "teacher_name", label: "Lecturer", alignRight: false, sx : { minWidth : 200, } },
          { id: "citizen", label: "Citizen", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/student/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/student",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
