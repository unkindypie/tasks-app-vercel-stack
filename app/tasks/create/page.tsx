"use client";

import { useFormik, FormikProvider } from "formik";
import * as yup from "yup";

import { Wrapper } from "@/ui/components/core/Wrapper";
import { InputField } from "@/ui/components/core/InputField";
import { Card } from "@/ui/components/core/Card";
import { Button } from "@/ui/components/core/Button";
import { TaskStatusEnum } from "@/schema/models";
import { SelectField } from "@/ui/components/core/SelectField";
import { useProjectsQuery } from "@/ui/queries/projects";
import { CreateTaskRequest } from "@/services/tasks";
import { useCreateTaskMutation } from "@/ui/queries/tasks";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  text: yup.string().required(),
  status: yup.string().oneOf(TaskStatusEnum.enumValues).required(),
  projectId: yup.number().required("Please select a project"),
});

export default function CreateTaskPage() {
  const { mutateAsync } = useCreateTaskMutation();
  const router = useRouter();
  const formik = useFormik<CreateTaskRequest>({
    initialValues: {
      text: "",
    } as CreateTaskRequest,
    validationSchema: schema,
    onSubmit: async (values) => {
      await mutateAsync(values);
      router.replace("/");
    },
  });
  const { data: projects, isLoading } = useProjectsQuery();

  return (
    <Wrapper showBack className="mt-6">
      <FormikProvider value={formik}>
        <div className="flex justify-center items-center mb-2">
          <h1 className="text-lg font-bold">Create your task</h1>
        </div>
        <Card>
          <InputField
            id="text"
            name="text"
            label="What needs to be done"
            placeholder="Feed the cat"
          />
          <SelectField
            id="status"
            name="status"
            label="What's the status"
            options={TaskStatusEnum.enumValues.map((v) => ({
              label: v,
              value: v,
            }))}
          />
          <SelectField
            id="projectId"
            name="projectId"
            label="Project"
            options={projects?.map((p) => ({ value: p.id, label: p.name }))}
            isLoading={isLoading}
          />
          <Button
            className="mt-14"
            type="submit"
            onClick={() => formik.handleSubmit()}
            isLoading={formik.isSubmitting}
          >
            Create
          </Button>
        </Card>
      </FormikProvider>
    </Wrapper>
  );
}
