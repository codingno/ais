import FormMaster from "../../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Courses Evalutaion"
      titlePage="Courses Evalutaion"
      submitUrl="/api/eval-questions"
      additionalForm={[
        {
          label: "Question",
          name: "question",
          value: "question",
        },
        {
          label: "Type",
          name: "type",
          value: "type",
        },
      ]}
      disableMasterForm={true}
      method="edit"
    />
  );
}
