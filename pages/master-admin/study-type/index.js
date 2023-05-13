import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Study Types">
      <List
        title="Study Types"
        name="Study"
        getUrl="/api/study-type"
        addLink="/master-admin/study-type/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/study-type/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/study-type/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
