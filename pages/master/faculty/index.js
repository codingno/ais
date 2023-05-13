import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Faculties">
      <List
        title="Faculties"
        name="Faculty"
        getUrl="/api/faculty"
        addLink="/master/faculty/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "code", label: "Faculty Code", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/faculty/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/faculty/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
