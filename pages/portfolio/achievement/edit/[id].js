import FormMaster from "../../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Edit Portfolio"
      titlePage="Edit Portfolio"
      submitUrl="/api/portfolio"
			portfolio_id={5}
			listForm={[
				{
					label : 'Title',
					name : 'title',
					value : 'title',
				},
				{
					label : 'Description',
					name : 'description',
					value : 'description',
				},
				{
					label : 'File',
					name : 'file',
					value : 'url',
					type : 'file',
					path: "development",
				},
			]}
			disableMasterForm={true}
      method="edit"
    />
  );
}
