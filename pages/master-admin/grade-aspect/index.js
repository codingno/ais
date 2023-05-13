import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Grade Aspect">
      <List
        title="Grade Aspect"
        name="Grade Aspect"
        getUrl="/api/grade-aspect"
        addLink="/master-admin/grade-aspect/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "percentage", label: "Percentage (%)", alignRight: false },
          { id: "position", label: "Position", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/grade-aspect/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/grade-aspect",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
