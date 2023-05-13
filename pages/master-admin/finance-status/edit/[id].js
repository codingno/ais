import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Financial Status"
      titlePage="Financial Status"
      submitUrl="/api/finance-status"
      method="create"
    />
  );
}
