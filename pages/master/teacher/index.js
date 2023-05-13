import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Lecturers">
      <List
        title="Lecturers"
        name="Lecturer"
        getUrl="/api/teacher"
        addLink="/master/teacher/create"
        isUserList={true}
        tableHead={[
          { id: "name", label: "Name", alignRight: false, sx : { minWidth : 200, } },
          { id: "nidn", label: "NIDN", alignRight: false },
          { id: "faculty_name", label: "Faculty", alignRight: false, sx : { minWidth : 200, } },
          { id: "departement_name", label: "Study Program",alignRight: false, sx : { minWidth : 200 } },
          { id: "status", label: "Status", alignRight: false },
          { id: "citizen", label: "Citizen", alignRight: false },
          { id: "employment_name", label: "Employment", alignRight: false },
          { id: "" },
        ]}
        filterObject={['user','name']}
        moremenu={[
          {
            name: "Edit",
            link: "/master/teacher/edit/",
          },
          {
            name: "Scoring",
            link: "/master/teacher/scoring/",
          },
        ]}
        deleteOptions={{
          link: "/api/teacher",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
