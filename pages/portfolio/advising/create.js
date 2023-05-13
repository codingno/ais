import FormMaster from "../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Advising"
      titlePage="Add Advising"
      submitUrl="/api/portfolio"
			portfolio_id={3}
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
					path: "advising",
				},
			]}
			disableMasterForm={true}
      method="create"
    />
  );
}
