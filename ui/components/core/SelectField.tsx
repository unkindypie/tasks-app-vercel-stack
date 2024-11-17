import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  description?: string;
  options: Array<{ value: string | number; label: string }> | undefined;
  isLoading?: boolean;
}

export function SelectField({ options, isLoading, ...props }: InputProps) {
  const [field, { error }] = useField({
    id: props.id,
    name: props.name,
  });
  const { submitCount } = useFormikContext();

  return (
    <div className="w-full py-2">
      <Field>
        {props.label && (
          <Label className="my-2 flex flex-row items-center">
            {props.label}{" "}
            {isLoading && (
              <ArrowPathIcon className="animate-spin size-4 ml-2" />
            )}
          </Label>
        )}
        {props.description && (
          <Description className="text-sm/6 text-white/50">
            {props.description}
          </Description>
        )}
        <div className="relative">
          <Select
            className={clsx(
              "h-8 p-4 rounded-md w-full text-black py-1.5",
              !field.value && "text-gray-500",
            )}
            {...field}
            disabled={isLoading}
          >
            <option value="">None</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
        {error && submitCount > 0 && (
          <Description className="mt-1 text-red-200 ">
            {error[0].toUpperCase()}
            {error.slice(1)}
          </Description>
        )}
      </Field>
    </div>
  );
}
