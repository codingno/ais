import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";
import { useSession } from "next-auth/react"

export default function () {
  const router = useRouter();
	const { data: session, status : statusSession } = useSession()
	let tableHead = [
          { id: "name", label: "Name", alignRight: false },
          { id: "student_number", label: "Student Number", alignRight: false },
          { id: `faculty`, label: "Faculty", alignRight: false },
          { id: "reason", label: "reason", alignRight: false },
          { id: "date", label: "Date", type: 'Date', alignRight: false },
          { id: "approved", label: "Approved", type: 'boolean', center : 'center', alignRight: false },
          // { id: "url", label: "File", alignRight: false, link : true },
          { id: "" },
        ]
	// if(session)
	// 	if(session.user.role_id !== 1)
	// 			tableHead.unshift(
  //         { id: "user_name", label: "User", alignRight: false }
	// 			)
	if(statusSession !== 'authenticated')
					return ""
  return (
    <BasicLayout title="Study leave">
      <List
        title="Study leave"
        name="Leave"
        getUrl="/api/student-leave"
        addLink="/administration/leave/create"
        tableHead={tableHead}
        moremenu={[
          {
            name: "Edit",
            link: "/administration/leave/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/student-leave",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
