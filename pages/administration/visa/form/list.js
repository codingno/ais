import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import List from "../../../../components/utils/List";
import BasicLayout from "../../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

	const { data : session, status : statusSession } = useSession()

  return (
    <BasicLayout title="Students Visa Expired">
			{
				session?.user &&
      <List
        title="VISA Application Form"
        name="VISA"
				getUrl={`/api/visa-form${session?.user.role_id == 1 ? '' : '?user_id=' + session?.user.userID}`}
        addLink="/administration/visa/form"
				isUserList={true}
        tableHead={[
          { id: "nama_lengkap", label: "Name", alignRight: false },
          { id: "telpon", label: "Handphone", alignRight: false },
          { id: "nama_penjamin", label: "Guarantor", alignRight: false },
          { id: "telpon_penjamin", label: "Guarantor HP", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/administration/visa/form/",
          },
          {
            name: "PDF",
            link: "/administration/visa/pdf/",
          },
          // {
          //   name: "Email",
          //   link: "/master/student/edit/",
          // },
        ]}
        // deleteOptions={{
        //   link: "/api/student",
        //   note: "Are you sure to delete this item?",
        // }}
      />
			}
    </BasicLayout>
  );
}
