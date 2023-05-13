import FormMaster from "../../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Degree Candidacy"
      titlePage="Add Degree Candidacy"
      submitUrl="/api/portfolio"
			portfolio_id={2}
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
					path: "candidacy",
				},
			]}
			disableMasterForm={true}
      method="edit"
    />
  );
}
