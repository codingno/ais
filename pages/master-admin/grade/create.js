import FormMaster from "../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Create Grade"
      titlePage="Create Grade"
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
					type : 'float',
				},
				{
					label : 'Minimum',
					name : 'minimum',
					value : 'minimum',
					type : 'float',
				},
				{
					label : 'Maximum',
					name : 'maximum',
					value : 'maximum',
					type : 'float',
				},
			]}
			disableMasterForm={true}
      method="create"
    />
  );
}
