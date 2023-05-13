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
    <BasicLayout title="Courses">
      <List
        title="Courses"
        name="Courses"
        getUrl="/api/course"
        addLink={
          session.user.role_id != 1 ? null :  
          "/academic/course/create"
        }
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "code", label: "Code", alignRight: false },
          { id: "departement_name", label: "Study Program", alignRight: false },
          { id: "credits", label: "Credit Hours", alignRight: false },
          { id: "semester", label: "Semester", alignRight: false },
          { id: "course_type_description", label: "Course Type", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={
          session.user.role_id != 1 ? [] :  
          [
          {
            name: "Edit",
            link: "/academic/course/edit/",
          },
        ]}
        deleteOptions={
          session.user.role_id != 1 ? {} :
          {
          link: "/api/course/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
