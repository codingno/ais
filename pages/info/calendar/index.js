import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Calendar">
      <List
        title="Calendar"
        name="Calendar"
        getUrl="/api/info?position=Calendar"
        addLink="/info/calendar/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "start_date", label: "Start", alignRight: false, type : 'Date' },
          { id: "end_date", label: "End", alignRight: false, type : 'Date' },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/info/calendar/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/info",
          note: "Are you sure to delete this item?",
        }}
				readOnly={true}
      />
    </BasicLayout>
  );
}
