import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Student Status"
      titlePage="Student Status"
      submitUrl="/api/student-status"
      method="edit"
    />
  );
}
