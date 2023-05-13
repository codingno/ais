import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Teacher Scoring"
      titlePage="Teacher Scoring"
      submitUrl="/api/teacher-scoring"
      additionalForm={[
        {
          label: "Aspect",
          name: "aspect",
          value: "aspect",
        },
        {
          label: "Scoring",
          name: "scoring",
          value: "scoring",
        },
      ]}
      disableMasterForm={true}
      method="edit"
    />
  );
}
