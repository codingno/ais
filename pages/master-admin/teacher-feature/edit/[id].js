import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Teacher Feature"
      titlePage="Teacher Feature"
      submitUrl="/api/teacher-feature"
      additionalForm={[
        {
          label: "Feature",
          name: "feature",
          value: "features",
        },
      ]}
      disableMasterForm={true}
      method="edit"
    />
  );
}
