import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="User Roles">
      <List
        title="User Roles"
        name="User Role"
        getUrl="/api/role"
        addLink="/master-admin/role/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/role/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/role",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
