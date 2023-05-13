import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  const { data : session, status : statusSession } = useSession()

  if (statusSession == 'unauthenticated') {
    router.push('/auth/signin')
    return ""
  }

  if(statusSession == 'loading')
    return <BasicLayout title="Course Schedule"></BasicLayout>

  return (
    <BasicLayout title="Curriculums">
      <List
        title="Curriculums"
        name="Curriculum"
        getUrl="/api/curriculum"
        addLink={
          session.user.role_id != 1 ? null :  
        "/academic/curriculum/create"
        }
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "code", label: "Code", alignRight: false },
          { id: "year", label: "Year", alignRight: false },
          { id: "" },
        ]}
        moremenu={
          session.user.role_id != 1 ? [] :
          [
          {
            name: "Edit",
            link: "/academic/curriculum/edit/",
          },
        ]}
        deleteOptions={
          session.user.role_id != 1 ? {} :
          {
          link: "/api/curriculum/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
