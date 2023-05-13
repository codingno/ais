import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Edit Grade Aspect"
      titlePage="Edit Grade Aspect"
      submitUrl="/api/grade-aspect"
			additionalForm={[
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
			disableMasterForm={true}
      method="edit"
    />
  );
}
