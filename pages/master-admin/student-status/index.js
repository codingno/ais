import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Student Status">
      <List
        title="Student Status"
        name="Student Status"
        getUrl="/api/student-status"
        addLink="/master-admin/student-status/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/student-status/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/student-status",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
