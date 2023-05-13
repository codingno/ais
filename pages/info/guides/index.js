import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Guides">
      <List
        title="Guides"
        name="Guides"
        getUrl="/api/info?position=Guides"
        addLink="/info/guides/create"
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
            link: "/info/guides/edit/",
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
