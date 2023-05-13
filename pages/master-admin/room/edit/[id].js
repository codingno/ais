import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Course Type"
      titlePage="Course Type"
      submitUrl="/api/room"
			additionalForm={[
				{
					label : 'Capacity',
					name : 'capacity',
					value : 'capacity',
				},
			]}
      method="edit"
    />
  );
}
