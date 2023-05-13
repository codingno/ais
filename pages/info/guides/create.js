import FormMaster from "../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Create Guides"
      titlePage="Create Guides"
      submitUrl="/api/info"
			additionalForm={[
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
			// disableMasterForm={true}
      method="create"
			position="guides"
    />
  );
}
