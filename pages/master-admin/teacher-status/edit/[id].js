import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Teacher Status"
      titlePage="Teacher Status"
      submitUrl="/api/teacher-status"
      method="edit"
    />
  );
}
