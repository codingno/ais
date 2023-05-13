import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Religion">
      <List
        title="Religion"
        name="Religion"
        getUrl="/api/religion"
        addLink="/master-admin/religion/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/religion/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/religion",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
