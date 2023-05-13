import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Grades">
      <List
        title="Grades"
        name="Grade"
        getUrl="/api/grade"
        addLink="/master-admin/grade/create"
        tableHead={[
          { id: "grade", label: "Grade", alignRight: false },
          { id: "point", label: "Point", alignRight: false },
          { id: "minimum", label: "Minimum", alignRight: false },
          { id: "maximum", label: "Maximum", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/grade/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/grade",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
