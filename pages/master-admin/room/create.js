import FormMaster from "../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Rooms"
      titlePage="Rooms"
      submitUrl="/api/room"
			additionalForm={[
				{
					label : 'Capacity',
					name : 'capacity',
					value : 'capacity',
				},
			]}
      method="create"
    />
  );
}
