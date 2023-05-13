import FormMaster from "../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Portfolio"
      titlePage="Add Portfolio"
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
      method="create"
    />
  );
}
