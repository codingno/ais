import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Edit News"
      titlePage="Edit News"
      submitUrl="/api/info"
			additionalForm={[
				{
					label : 'Source',
					name : 'source',
					value : 'source',
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
			// disableMasterForm={true}
      method="edit"
			position="news"
    />
  );
}

