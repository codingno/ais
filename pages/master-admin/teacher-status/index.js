import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Teacher Status">
      <List
        title="Teacher Status"
        name="Teacher Status"
        getUrl="/api/teacher-status"
        addLink="/master-admin/teacher-status/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/teacher-status/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/teacher-status",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
