import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Course Types">
      <List
        title="Course Types"
        name="Course Type"
        getUrl="/api/course-type"
        addLink="/master-admin/course-type/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/course-type/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/course-type",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
