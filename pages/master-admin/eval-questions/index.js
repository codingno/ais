import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Courses Evalutaion">
      <List
        title="Courses Evalutaion"
        name="Courses Evalutaion"
        getUrl="/api/eval-questions"
        addLink="/master-admin/eval-questions/create"
        tableHead={[
          { id: "question", label: "Question", alignRight: false },
          { id: "type", label: "Type", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/eval-questions/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/eval-questions",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
