import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FormMaster from "../../../../components/utils/FormMasterWithUploadAndOptions";
export default function () {
	const { data : session, status : statusSession } = useSession()
	const router = useRouter()

	if(statusSession == "loading")
		return ""
	if(statusSession == 'authenticated' && !session.user.isStudent) {
		router.push("/")
		return ""
	}


  return (
    <FormMaster
      title="Edit Student Exchange"
      titlePage="Edit Student Exchange"
      submitUrl="/api/student-exchange"
			listForm={[
				{
					label : 'Name',
					name : 'name',
					value : 'name',
					// initialValue : session.user.name,
				},
				{
					label : 'Student Number',
					name : 'student_number',
					value : 'student_number',
					// initialValue : session.user.studentData.student_number,
				},
				{
					label : 'Faculty',
					name : 'faculty_id',
					value : 'faculty_id',
					// initialValue : session.user.studentData.departement.faculty.id,
					type : 'select',
					optionUrl : '/api/faculty'
				},
				{
					label : 'Exchange With University',
					name : 'exchange_with_university',
					value : 'exchange_with_university',
				},
				{
					label : 'Start Date',
					name : 'start_date',
					value : 'start_date',
					type : 'date',
				},
				{
					label : 'End Date',
					name : 'end_date',
					value : 'end_date',
					type : 'date',
				},
			]}
			disableMasterForm={true}
      method="edit"
    />
  );
}
