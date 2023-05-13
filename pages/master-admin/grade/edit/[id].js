import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Edit Grade"
      titlePage="Edit Grade"
      submitUrl="/api/grade"
			additionalForm={[
				{
					label : 'Grade',
					name : 'grade',
					value : 'grade',
				},
				{
					label : 'Point',
					name : 'point',
					value : 'point',
					type : 'number',
				},
				{
					label : 'Minimum',
					name : 'minimum',
					value : 'minimum',
					type : 'number',
				},
				{
					label : 'Maximum',
					name : 'maximum',
					value : 'maximum',
					type : 'number',
				},
			]}
			disableMasterForm
      method="edit"
    />
  );
}
