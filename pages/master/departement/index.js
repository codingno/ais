import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Program Studies">
      <List
        title="Program Studies"
        name="Study Program"
        getUrl="/api/departement"
        addLink="/master/departement/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "code", label: "Code", alignRight: false },
          { id: "teacher_name", label: "Head", alignRight: false },
          { id: "study_type_name", label: "Study Level", alignRight: false },
          { id: "accreditation", label: "Accreditation", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/departement/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/departement/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
