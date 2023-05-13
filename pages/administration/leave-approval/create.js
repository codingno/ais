import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FormMaster from "../../../components/utils/FormMasterWithUploadAndOptions";
export default function () {
	const { data : session, status : statusSession } = useSession()
	const router = useRouter()

	if(statusSession == "loading")
		return ""

  return (
    <FormMaster
      title="Add Leave"
      titlePage="Add Leave"
      submitUrl="/api/student-leave"
			listForm={[
				{
					label : 'Name',
					name : 'name',
					value : 'name',
					initialValue : session.user.isStudent ? session.user.name : null,
				},
				{
					label : 'Student Number',
					name : 'student_number',
					value : 'student_number',
					initialValue : session.user.isStudent ? session.user.studentData.student_number : null,
				},
				{
					label : 'Faculty',
					name : 'faculty_id',
					value : 'faculty_id',
					initialValue : session.user.isStudent ? session.user.studentData.departement.faculty.id: "",
					type : 'select',
					optionUrl : '/api/faculty'
				},
				{
					label : 'Reason',
					name : 'reason',
					value : 'reason',
				},
				{
					label : 'Date',
					name : 'date',
					value : 'date',
					type : 'date',
					initialValue : new Date(),
				},
			]}
			disableMasterForm={true}
      method="create"
    />
  );
}
