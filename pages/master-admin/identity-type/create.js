import FormMaster from "../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Identity Types"
      titlePage="Identity Types"
      submitUrl="/api/identity-type"
      method="create"
    />
  );
}
