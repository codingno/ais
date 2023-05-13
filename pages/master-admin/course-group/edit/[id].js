import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Course Group"
      titlePage="Course Group"
      submitUrl="/api/course-group"
      method="edit"
    />
  );
}
