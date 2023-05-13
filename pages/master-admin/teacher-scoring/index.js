import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Teacher Scoring">
      <List
        title="Teacher Scoring"
        name="Teacher Scoring"
        getUrl="/api/teacher-scoring"
        addLink="/master-admin/teacher-scoring/create"
        tableHead={[
          { id: "aspect", label: "Aspect", alignRight: false },
          { id: "scoring", label: "Scoring", alignRight: false },
          {
            id: "feature",
            label: "Feature",
            type: "view",
            alignRight: false,
            link: "/master-admin/teacher-feature/",
          },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/teacher-scoring/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/teacher-scoring",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
