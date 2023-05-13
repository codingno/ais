import FormMaster from "../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Thesis/Disertation"
      titlePage="Add Thesis/Disertation"
      submitUrl="/api/portfolio"
			portfolio_id={4}
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
					path: "thesis-disertation",
				},
			]}
			disableMasterForm={true}
      method="create"
    />
  );
}
