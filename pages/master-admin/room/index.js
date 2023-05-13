import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Rooms">
      <List
        title="Rooms"
        name="Room"
        getUrl="/api/room"
        addLink="/master-admin/room/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "capacity", label: "Capacity", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/room/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/room",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
