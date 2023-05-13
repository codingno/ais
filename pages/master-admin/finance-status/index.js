import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Finance Status">
      <List
        title="Financial Status"
        name="Finance Status"
        getUrl="/api/finance-status"
        addLink="/master-admin/finance-status/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/finance-status/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/finance-status",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
