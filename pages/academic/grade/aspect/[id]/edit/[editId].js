import FormMaster from "../../../../../../components/utils/FormMaster";
import { useRouter } from "next/router";
export default function () {
	const router = useRouter()

	const { editId } = router.query

  return (
    <FormMaster
      title="Create Grade Aspect"
      titlePage="Create Grade Aspect"
      submitUrl="/api/grade-aspect-course"
			additionalForm={[
				{
					label : 'Course Schedule ID',
					name : 'academic_schedule_id',
					value : 'academic_schedule_id',
					type : 'integer',
					disabled : true,
				},
				{
					label : 'Name',
					name : 'name',
					value : 'name',
				},
				{
					label : 'Percentage (%)',
					name : 'percentage',
					value : 'percentage',
					type : 'integer',
				},
				{
					label : 'Position',
					name : 'position',
					value : 'position',
					type : 'integer',
				},
			]}
			customId={editId}
			disableMasterForm={true}
      method="edit"
    />
  );
}
