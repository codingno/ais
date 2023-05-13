import FormMaster from "../../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Professional Development"
      titlePage="Add Professional Development"
      submitUrl="/api/portfolio"
			portfolio_id={1}
			listForm={[
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
