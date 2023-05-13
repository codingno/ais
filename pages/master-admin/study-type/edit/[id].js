import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Study Type"
      titlePage="Study Type"
      submitUrl="/api/study-type"
      method="edit"
    />
  );
}
