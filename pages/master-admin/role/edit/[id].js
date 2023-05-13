import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="User Roles"
      titlePage="User Roles"
      submitUrl="/api/role"
      method="edit"
    />
  );
}
